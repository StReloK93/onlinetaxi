<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn :to="{ name: 'auth-user' }">
            <v-icon>mdi-account</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Mening elonlarim</span>
        </v-btn>
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-taxi</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Haydovchilar</span>
        </v-btn>
        <v-btn :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 88px;" class="tw-leading-none">Yo'lovchilar</span>
        </v-btn>
    </v-bottom-navigation>
</template>