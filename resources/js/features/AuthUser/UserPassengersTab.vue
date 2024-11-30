<template>
   <v-spacer class="position-relative">
      <main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
         <TransitionGroup name="list">
            <div v-if="loading" class="d-flex justify-center w-100 pt-8">
               <v-progress-circular color="primary"  indeterminate size="50"></v-progress-circular>
            </div>
            <template v-else-if="passengerStore.passengers?.length">
               <Card @activate="selectActive" :activeCard="activeCard" :crud="true"
                  v-for="passenger in passengerStore.passengers" :passenger="passenger" :key="passenger.id"
                  class="mb-2" />
            </template>
            <v-alert v-else text="Faol elonlar topilmadi"></v-alert>
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
const loading = ref(true)
function selectActive(id) {
   if (activeCard.value == id) return activeCard.value = null
   else return activeCard.value = id
}


async function getData() {
   loading.value = true
   passengerStore.passengers = await UserRepository.passengers()
   loading.value = false

}

onMounted(() => {
   getData()
})
onUnmounted(() => {
   passengerStore.passengers = []
})
</script>