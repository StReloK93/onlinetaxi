<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import initFirebase from './swInit'
import { onMounted, provide, ref } from 'vue'

const deferredPrompt = ref(null)
provide('deferredPrompt', deferredPrompt)
window.addEventListener('beforeinstallprompt', event => {
    console.log('I am happy');
    
    event.preventDefault()
    deferredPrompt.value = event
})
onMounted(() => initFirebase())
</script>