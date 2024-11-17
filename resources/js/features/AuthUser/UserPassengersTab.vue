<template>
   <v-spacer class="position-relative">
      <main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
         <TransitionGroup name="list">
            <template v-if="passengerStore.passengers?.length">
               <Card @activate="selectActive" :activeCard="activeCard" :crud="true"
                  v-for="passenger in passengerStore.passengers" :passenger="passenger" :key="passenger.id"
                  class="mb-2" />
            </template>
         </TransitionGroup>
      </main>
   </v-spacer>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { Card, usePassengerStore } from '@/features/Passengers';
import UserRepository from '@/features/AuthUser/UserRepository';
const passengerStore = usePassengerStore()
const activeCard = ref(null)

function selectActive(id) {
   if (activeCard.value == id) return activeCard.value = null
   else return activeCard.value = id
}


async function getData() {
   passengerStore.passengers = await UserRepository.passengers()
}

onMounted(() => {
   getData()
})
onUnmounted(() => {
   passengerStore.passengers = []
})
</script>