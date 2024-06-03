<template>
   <v-app class="login-page">
      <v-container class="d-flex h-100 justify-center align-center px-2">
         <v-card width="360" class="pa-3 bg-white">
            <div class="text-center py-4 mb-2 ma-n3 rounded bg-amber-lighten-4">
               <img src="/iconos/logo.png" width="100" class="d-inline">
               <h3 class="text-h6 mt-2 font-weight-medium text-uppercase">Shaharlararo online taxi</h3>
            </div>
            <div class="pa-2 pt-8">
               <v-btn v-if="deferredPrompt" @click="installApp" block append-icon="mdi-download" color="black" variant="tonal">
                  Ilovani o'rnatish
               </v-btn>
               <v-btn v-else block append-icon="mdi-check" color="black" variant="tonal" disabled>
                  Ilova o'rnatilgan
               </v-btn>

               <v-btn block color="primary" :to="{name: 'main'}" variant="tonal" class="mt-2">
                  Dasturga o'tish
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