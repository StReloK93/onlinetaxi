<template>
   <section class="h-100 d-flex flex-column pa-1">
      <v-btn @click="emit('back')" class="flex-grow-0" color="dark" variant="tonal" block prepend-icon="mdi-chevron-left">
         Orqaga
      </v-btn>
      <main class="d-flex justify-center align-center flex-grow-1">
         <div class="d-flex flex-column mr-1">
            <v-btn variant="tonal" color="dark" size="small" @click="nextItem(hours, 'hour')">
               <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn variant="text" color="dark" class="my-1">
               {{ hours[pageData.hour] }}
            </v-btn>
            <v-btn variant="tonal" color="dark" size="small" @click="prevItem(hours, 'hour')">
               <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
         </div>
   
         <div class="d-flex flex-column">
            <v-btn variant="tonal" color="dark" size="small" @click="nextItem(minutes, 'minute')">
               <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn variant="text" color="dark" class="my-1">
               {{ minutes[pageData.minute] }}
            </v-btn>
            <v-btn variant="tonal" color="dark" size="small" @click="prevItem(minutes, 'minute')">
               <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
         </div>
      </main>
      <v-btn @click="emit('success')" class="flex-grow-0" variant="tonal" block append-icon="mdi-check">
         Tasdiqlash
      </v-btn>
   </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const hours = reactive([])
const model = defineModel()

const emit = defineEmits(['back', 'success'])

const pageData = reactive({
   hour: 12,
   minute: 0
})

for (let index = 0; index < 24; index++) {
   if (index < 10) hours.push(`0${index}`)
   else hours.push(`${index}`)
}


function nextItem(array, current) {
   if (array.length - 1 == pageData[current]){
      if(current == 'minute') pageData.hour++
      pageData[current] = 0
   }
   else pageData[current]++

   model.value = `${hours[pageData.hour]}:${minutes[pageData.minute]}`
}

function prevItem(array, current) {
   if (pageData[current] == 0){
      if(current == 'minute') pageData.hour--
      pageData[current] = array.length - 1
   }
   else pageData[current]--
   model.value = `${hours[pageData.hour]}:${minutes[pageData.minute]}`
}

const minutes = reactive([])

for (let index = 0; index < 6; index++) {
   if (index == 0) minutes.push(`0${index}`)
   else minutes.push(`${index * 10}`)
}
</script>