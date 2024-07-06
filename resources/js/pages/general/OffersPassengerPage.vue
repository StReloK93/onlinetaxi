<template>
   <section>
      <PassengerInformation :passenger="passenger" />
      <div class="d-flex justify-space-between align-center">
         <h3 class="text-h6 my-3 text-grey-darken-4">Haydovchilar takliflari</h3>
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

const props = defineProps(['id'])
const passenger: Ref<IPassenger> = ref(null)
const offersStore = useOffersPassenger()

onMounted(async () => {
   offersStore.offers = await PassengerRepository.getOffers(props.id)
   passenger.value = await PassengerRepository.show(props.id)
})
onUnmounted(() => offersStore.offers = null)
</script>
