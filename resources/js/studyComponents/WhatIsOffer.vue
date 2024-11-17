<template>
   <div class="text-right w-100 mb-2">
      <v-btn @click="bottomSheet = true" variant="text" append-icon="mdi-alert-circle" block>Taklif qanday ishlaydi?</v-btn>
   </div>
   <v-bottom-sheet v-model="bottomSheet" inset>
      <v-card class="bg-white">
         <v-card-title>Taklif funksiyasi ishlashi haqida</v-card-title>
         <v-card-text style="max-height: 700px;" class="pa-4 tw-relative">
            Haydovchi yo'lovchiga ketadigan <b>vaqtini</b>  va mo'ljalidagi <b>yo'lkira narxini</b> taklif qiladi. Yo'lovchiga takfil maqul bo'lsa haydovchiga aloqaga chiqadi.
			</v-card-text>
      </v-card>
   </v-bottom-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const bottomSheet = ref(false)
</script>