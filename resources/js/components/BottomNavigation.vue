<template>
    <v-bottom-navigation color="primary"  class="text-center">
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span style="width: 100px;">Qatnovlar</span>
        </v-btn>

        <v-btn :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span style="width: 100px;">Yo'lovchilar</span>
        </v-btn>

        <v-btn :to="{ name: 'transports' }">
            <v-icon>mdi-train-car</v-icon>
            <span style="width: 100px;">Transportim</span>
        </v-btn>
    </v-bottom-navigation>
</template>