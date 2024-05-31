<template>
   <main class="d-flex w-100 mb-3">
      <v-text-field class="pr-2 flex-0-0" readonly density="compact" value="+998" disabled>
         <template v-slot:prepend-inner>
            <v-icon>
               <img src="/iconos/uz.png" class="w-100">
            </v-icon>
         </template>
      </v-text-field>
      <v-text-field v-maska:[phoneMask] inputmode="tel" v-model="model" density="compact" :rules="rules" />
   </main>
</template>

<script setup lang="ts">
import { rules, phoneMask } from '@/modules/constants'
const model = defineModel()
</script>