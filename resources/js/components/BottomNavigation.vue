<template>
    <v-bottom-navigation color="primary" grow>
        <v-btn :to="{ name: 'car-rides' }">
            <v-icon>mdi-timeline-clock-outline</v-icon>
            Qatnovlar
        </v-btn>

        <v-btn :to="{ name: 'passengers' }" >
            <v-icon>mdi-human-greeting</v-icon>
            Yo'lovchilar
        </v-btn>

        <!-- <v-btn>
            <v-icon>mdi-map-marker</v-icon>
            Nearby
        </v-btn> -->
    </v-bottom-navigation>
</template>

<script setup lang="ts">

</script>