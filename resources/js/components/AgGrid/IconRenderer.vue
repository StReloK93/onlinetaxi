<template>
    <v-btn :color="color" :icon="params.icon" :variant="variant" size="x-small"></v-btn>
</template>
<script lang="ts" setup>
const { params } = defineProps(['params'])
const color = params.color == null ? 'primary' : params.color
const variant = params.variant == null ? 'flat' : params.variant
</script>