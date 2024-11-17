<template>
   <v-spacer class="position-relative">
      <main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
         <TransitionGroup name="list">
            <template v-if="rideStore.activeRides?.length">
               <CardCarRide @activate="selectActive" :activeCard="activeCard" v-for="ride in rideStore.activeRides"
                  :ride="ride" :key="ride.id" />
            </template>
            <!-- <v-alert v-else text="Haydovchilar topilmadi"></v-alert> -->
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

function selectActive(id) {
   if (activeCard.value == id) return activeCard.value = null
   else return activeCard.value = id
}


async function getUserRides() {
   rideStore.rides = await UserRepository.rides()
}

onMounted(() => {
   getUserRides()
})
onUnmounted(() => {
   rideStore.rides = []
})
</script>