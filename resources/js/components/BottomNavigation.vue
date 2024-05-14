<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn v-if="Auth.isDriver" :to="{ name: 'car-rides-auth-user' }">
            <v-icon>mdi-taxi</v-icon>
            <span style="width: 90px;" class="tw-leading-none">Mening qatnovlarim</span>
        </v-btn>
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span style="width: 90px;" class="tw-leading-none">Barcha Qatnovlar</span>
        </v-btn>

        <v-btn v-if="Auth.isAnyAdmins || Auth.isPassenger"  :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 90px;" class="tw-leading-none">Barcha Yo'lovchilar</span>
        </v-btn>

        <v-btn v-if="Auth.isAnyAdmins || Auth.isDriver" :to="{ name: 'transports' }">
            <v-icon>mdi-train-car</v-icon>
            <span style="width: 90px;" class="tw-leading-none">Mening Transportim</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'
const Auth = useAuthStore()
</script>