<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span style="width: 90px;">Qatnovlar</span>
        </v-btn>

        <v-btn v-if="[1,2,3].includes(Auth.user.role_id)"  :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 90px;">Yo'lovchilar</span>
        </v-btn>

        <v-btn v-if="[1,2,4].includes(Auth.user.role_id)" :to="{ name: 'transports' }">
            <v-icon>mdi-train-car</v-icon>
            <span style="width: 90px;">Transportim</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'
const Auth = useAuthStore()
</script>