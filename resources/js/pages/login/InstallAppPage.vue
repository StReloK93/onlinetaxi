<template>
   <v-app class="tw-h-screen login-page">
      <v-container class="d-flex h-100 justify-center align-center px-2">
         <v-card width="360" class="pa-3 tw-backdrop-brightness-90 tw-backdrop-blur-sm tw-bg-white/90">
            <div class="text-center py-4 mb-2 -tw-m-3 tw-rounded tw-bg-yellow-200/40">
               <img src="/iconos/logo.png" width="100" class="d-inline">
               <h3 class="tw-text-xl mt-2 tw-font-semibold tw-uppercase">Shaharlararo online taxi</h3>
            </div>
            <div class="pa-2">
               <v-btn v-if="deferredPrompt" @click="installApp" block append-icon="mdi-download" color="black" variant="tonal">
                  Ilovani o'rnatish
               </v-btn>
               <v-btn v-else block append-icon="mdi-check" color="black" variant="tonal" disabled>
                  Ilova o'rnatilgan
               </v-btn>
            </div>
         </v-card>
      </v-container>
   </v-app>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const deferredPrompt: any = inject('deferredPrompt')
const router = useRouter()

function installApp() {
   if (deferredPrompt) {
      deferredPrompt.value.prompt()
      deferredPrompt.value.userChoice
         .then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
               router.push({name: 'login'})
            } else {
               console.log('user dismissed A2HS prompt')
            }
            deferredPrompt.value = null
         })
   }
}
</script>