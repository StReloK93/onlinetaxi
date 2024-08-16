<template>
   <div class="text-right w-100 px-2 mb-2">
      <v-btn @click="bottomSheet = true" variant="text" append-icon="mdi-alert-circle" block>Taklif qanday ishlaydi?</v-btn>
   </div>
   <v-bottom-sheet v-model="bottomSheet" inset>
      <main class="bg-white pa-2">
         <h3>Taklif funksiyasi ishlashi haqida</h3>
         Haydovchi yo'lovchiga ketadigan <b>vaqtini</b>  va mo'ljalidagi <b>yo'lkira narxini</b> taklif qiladi. Yo'lovchiga takfil maqul bo'lsa haydovchiga aloqaga chiqadi.
      </main>
   </v-bottom-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const bottomSheet = ref(false)
</script>