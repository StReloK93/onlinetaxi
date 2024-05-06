<template>
    <v-btn v-if="params.data.trunk" :color="color" density="compact" variant="text">
        <v-tooltip activator="parent" location="bottom">
            Bagaj bor
        </v-tooltip>
        <v-icon>{{ params.icon }}</v-icon>
    </v-btn>
</template>
<script lang="ts" setup>
const { params } = defineProps(['params'])
const color = params.color == null ? 'primary' : params.color
</script>