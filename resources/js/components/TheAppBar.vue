<template>
   <v-app-bar density="comfortable" :elevation="0" :border="1" color="primary">
      <template v-slot:prepend>
         <v-app-bar-nav-icon color="white" @click="mainStore.menu = !mainStore.menu"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
         
         <v-btn v-if="active_notifications.length" color="white" icon="mdi-bell-badge" :to="{ name: 'notifications' }" />
         <v-btn v-else color="white" icon="mdi-bell" :to="{ name: 'notifications' }" />
      </template>
   </v-app-bar>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/useMainStore'
import UserRepository from '@/features/AuthUser/UserRepository';
import { onMounted, onUnmounted, ref } from 'vue'
const mainStore = useMainStore()
const active_notifications = ref([])
const interval = ref(null)

async function refreshNotifications(){
   active_notifications.value = await UserRepository.activeNotifications()
}

onMounted(async () => {
   refreshNotifications()

   interval.value = setInterval(() => {
      refreshNotifications()
   }, 30000)
})

onUnmounted(() => {
   clearInterval(interval.value)
})
</script>