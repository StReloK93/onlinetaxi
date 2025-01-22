<template>
   <v-app-bar density="comfortable" :elevation="0" :border="1" color="primary">
      <template v-slot:prepend>
         <v-app-bar-nav-icon color="white" @click="mainStore.menu = !mainStore.menu"></v-app-bar-nav-icon>
      </template>
      <!-- <template v-slot:append>
         <v-btn  color="white" icon="mdi-bell-badge" :to="{ name: 'notifications' }" />
      </template> -->
   </v-app-bar>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/useMainStore'
const mainStore = useMainStore()
</script>