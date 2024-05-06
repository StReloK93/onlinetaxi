<template>
    <div class="tw-leading-3 d-flex align-center">
        <main>
            <v-label class="text-caption">{{ params.value.region.name }}</v-label>
            <p class="">{{ params.value.name }}</p>
        </main>
        <main v-if="params.data.address_to_address && params.end" class="ml-4">
            <v-btn density="compact" variant="text" icon="">
                <v-tooltip activator="parent" location="bottom">
                    Manzilgacha
                </v-tooltip>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
        </main>
    </div>
</template>

<script setup lang="ts">
const { params } = defineProps(['params'])
</script>