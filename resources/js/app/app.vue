<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import initFirebase from './swInit'
initFirebase()
</script>