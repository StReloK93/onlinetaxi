<template>
   <section class="mt-n2">
      <v-alert
         class="mb-2"
         density="compact"
         text="Ushbu sahifada yo'lovchiga taklif qoldirsangiz bo'ladi. Agar taklifingiz
         yo'lovchiga maqul bo'lsa siz bilan aloqaga chiqadi"
         title="Taklif nega kerak?" variant="tonal"></v-alert>
      <PassengerInformation :crud="false" :passenger="passenger" />
      <div class="d-flex justify-space-between align-center">
         <p class="my-3 text-grey-darken-4">Yo'lovchiga o'z taklifingizni qoldiring.</p>
         <AddForm />
      </div>
      <section>
         <TransitionGroup name="list">
            <Card v-for="offer in offersStore.offers" :offer="offer" :key="offer.id" />
         </TransitionGroup>
      </section>
   </section>
</template>

<script setup lang="ts">
import { PassengerRepository, IPassenger } from '@/features/Passengers'
import { AddForm, Card, useOffersPassenger, PassengerInformation } from '@/features/OffersPassenger'
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore';
const AuthStore = useAuthStore()


const props = defineProps(['id'])
const passenger: Ref<IPassenger> = ref(null)
const offersStore = useOffersPassenger()

onMounted(async () => {
   offersStore.offers = await PassengerRepository.getOffers(props.id)
   passenger.value = await PassengerRepository.show(props.id)
})
onUnmounted(() => offersStore.offers = null)
</script>
