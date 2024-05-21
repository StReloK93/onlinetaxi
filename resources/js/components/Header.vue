<template>
    <Navigator />
    <v-app-bar density="comfortable" :elevation="0" :border="1" color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon color="white" @click="mainStore.menu = !mainStore.menu"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <div class="d-flex align-center">
                <v-icon v-if="Auth.isDriver">mdi-chess-knight</v-icon>
                <v-icon v-if="Auth.isPassenger">mdi-chess-pawn</v-icon>
                <v-icon v-if="Auth.isAdmin">mdi-chess-rook</v-icon>
                <v-icon v-if="Auth.isSuperAdmin">mdi-chess-king</v-icon>
    
                <span>
                    {{ Auth.user?.role?.name }}
                </span>
            </div>
        </v-app-bar-title>
        <!-- <v-btn icon="mdi-logout" density="comfortable" @click="logout" color="white"></v-btn> -->
    </v-app-bar>
</template>

<script setup lang="ts">
import Navigator from './Navigator.vue'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const mainStore = useMainStore()
const Auth = useAuthStore()
</script>