<template>
   <v-sheet tag="button" elevation="1" color="pink"
      class="d-flex w-100 justify-space-between tw-flex-wrap px-2 tw-py-1 rounded mb-1 tw-cursor-pointer" v-ripple>
      <aside class="w-50 tw-text-left">
         {{ props.ride.car.type }}
      </aside>
      <div class="w-50 tw-text-right tw-font-bold text-pink-lighten-5">
         {{ props.ride.price }} so'm
      </div>
      <main class="w-100 d-flex justify-space-between align-end">
         <div class="text-left">
            <span v-for="(n,index) in props.ride.free_seat">
               <v-icon v-if="index < aviablePassengersCount" size="small">mdi-account</v-icon>
               <v-icon v-else size="small" color="pink-lighten-2">mdi-account</v-icon>
            </span>
         </div>
         <Edit :id="props.ride.id" :smButton="true"></Edit>
      </main>
   </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Edit from '@/pages/general/CarRides/Edit.vue'
const props = defineProps(['ride'])

const aviablePassengersCount = computed(() => props.ride.passengers.reduce((acc, pass) => acc += pass.count, 0))
</script>