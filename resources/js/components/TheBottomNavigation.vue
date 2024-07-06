<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn :to="{ name: 'car-rides-auth-user' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Mening elonlarim</span>
        </v-btn>
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-taxi</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Haydovchi elonlari</span>
        </v-btn>

        <v-btn :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Yo'lovchi elonlari</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
</script>