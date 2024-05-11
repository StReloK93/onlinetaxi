<template>
    <Navigator />
    <v-app-bar density="comfortable" :elevation="0" :border="1" color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon color="white" @click="mainStore.menu = !mainStore.menu"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <span> <v-icon>mdi-chess-knight</v-icon> </span> {{ Auth.user?.role?.name }}
        </v-app-bar-title>
        <v-btn icon="mdi-logout" density="comfortable" @click="logout" color="white"></v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import Navigator from './Navigator.vue'
import { useMainStore, useAuthStore } from '@/store'
const mainStore = useMainStore()
const Auth = useAuthStore()


function logout() {
    mainStore.dialog.open(() => {
        mainStore.dialog.title = "Dasturdan chiqmoqchimisiz ?"
        mainStore.dialog.submit = () => Auth.logout()
    })
}
</script>