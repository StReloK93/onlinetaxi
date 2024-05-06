<template>
    <div class="tw-leading-none d-flex align-center">
        <v-icon v-for="count in params.value" color="primary">mdi-account</v-icon>
    </div>
</template>

<script setup lang="ts">
const { params } = defineProps(['params'])
</script>