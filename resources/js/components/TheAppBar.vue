<template>
   <v-app-bar density="comfortable" :elevation="0" :border="1" color="primary">
      <template v-slot:prepend>
         <v-app-bar-nav-icon color="white" @click="mainStore.menu = !mainStore.menu"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
         <BaseSelectPosition v-if="AuthStore.isPassenger == false" />
      </template>
   </v-app-bar>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import BaseSelectPosition from './BaseSelectPosition.vue'
const AuthStore = useAuthStore()
const mainStore = useMainStore()
</script>