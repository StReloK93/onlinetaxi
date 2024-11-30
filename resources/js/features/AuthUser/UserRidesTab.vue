<template>
   <v-spacer class="position-relative">
      <main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
         <TransitionGroup name="list">
            <div v-if="loading" class="d-flex justify-center w-100 pt-8">
               <v-progress-circular color="primary"  indeterminate size="50"></v-progress-circular>
            </div>
            <template v-else-if="rideStore.activeRides?.length">
               <CardCarRide @activate="selectActive" :activeCard="activeCard" v-for="ride in rideStore.activeRides"
                  :ride="ride" :key="ride.id" />
            </template>
            <v-alert v-else text="Faol elonlar topilmadi"></v-alert>
         </TransitionGroup>
      </main>
   </v-spacer>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useCarRide, CardCarRide } from '@/features/CarRides'
import UserRepository from '@/features/AuthUser/UserRepository';
const rideStore = useCarRide()
const activeCard = ref(null)
const loading = ref(true)

function selectActive(id) {
   if (activeCard.value == id) return activeCard.value = null
   else return activeCard.value = id
}


async function getUserRides() {
   loading.value = true
   rideStore.rides = await UserRepository.rides()
   loading.value = false
}

onMounted(() => {
   getUserRides()
})
onUnmounted(() => {
   rideStore.rides = []
})
</script>