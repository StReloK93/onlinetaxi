<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import initFirebase from './swInit'
import { onMounted, provide, ref } from 'vue'

const deferredPrompt = ref(null)
provide('deferredPrompt', deferredPrompt)
onMounted(() => {
    initFirebase()
    window.addEventListener('beforeinstallprompt', event => {
		event.preventDefault()
        deferredPrompt.value = event
	})
})
</script>