<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import initFirebase from './swInit'
import { onMounted } from 'vue'

onMounted(() => initFirebase())
</script>