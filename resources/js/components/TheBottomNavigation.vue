<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn v-if="Auth.isDriver" :to="{ name: 'car-rides-auth-user' }">
            <v-icon>mdi-taxi</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Mening qatnovlarim</span>
        </v-btn>
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Qatnovlar</span>
        </v-btn>

        <v-btn v-if="Auth.isPassengerAdmins"  :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Yo'lovchilar</span>
        </v-btn>

        <v-btn v-if="Auth.isDriverAdmins" :to="{ name: 'transports' }">
            <v-icon>mdi-train-car</v-icon>
            <span v-if="Auth.isDriverAdmins" style="width: 88px;" class="tw-leading-none">
                Transportlar
            </span>
            <span v-else style="width: 88px;" class="tw-leading-none">
                Mening transportim
            </span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
</script>