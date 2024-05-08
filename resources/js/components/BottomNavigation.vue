<template>
    <v-bottom-navigation color="primary">
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            <span>Qatnovlar</span>
        </v-btn>

        <v-btn :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            <span>Yo'lovchilar</span>
        </v-btn>

        <v-btn :to="{ name: 'transports' }" >
            <v-icon>mdi-train-car</v-icon>
            <span>Transportlar</span>
        </v-btn>
    </v-bottom-navigation>
</template>