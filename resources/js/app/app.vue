<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import initFirebase from './swInit'
import { ref, onMounted } from 'vue'
const btn = ref()

var deferredPrompt
 

onMounted(() => {
    initFirebase()

    // window.addEventListener('beforeinstallprompt', e => {
    //     e.preventDefault()
    //     deferredPrompt = e
    // })


    // btn.value.addEventListener('click', e => {
    //     if (deferredPrompt) {
    //         deferredPrompt.prompt()
    //         deferredPrompt.userChoice
    //             .then(choiceResult => {
    //                 if (choiceResult.outcome === 'accepted') {
    //                     console.log('user accepted A2HS prompt')
    //                 } else {
    //                     console.log('user dismissed A2HS prompt')
    //                 }
    //                 deferredPrompt = null
    //             })
        
    //     }
    // })
    
})
</script>