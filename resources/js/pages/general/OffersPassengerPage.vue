<template>
   <section>
      <v-card class="pa-2 pb-0 border-b border-primary border-opacity-100 rounded-b-0">
         <main class="d-flex align-center mb-3">
            <aside class="pr-2">
               {{ passenger?.start.name }}
            </aside>
            <div class="middle-line"></div>
            <aside class="pl-2">
               {{ passenger?.end.name }}
            </aside>
         </main>
         <main class="mb-2">
            <span v-for="item in passenger?.count">
               <v-icon size="small" color="primary">mdi-account</v-icon>
            </span>
         </main>
         <section class="d-flex justify-space-between align-center mx-n2">
            <div v-if="passenger?.ride_time" class="leading-none pl-2">
               <p class="text-grey-darken-1 mb-n2 text-caption">
                  {{ moment(passenger.ride_time).format('HH:mm') }}
               </p>
               <span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
                  {{ moment(passenger.ride_time).format('D-MMMM') }}
               </span>
            </div>
            <div v-else style="height: 44px;"></div>
            <div class="d-flex">
               <v-chip variant="tonal" color="primary" class="font-weight-medium rounded-e-0">
                  {{ format(passenger?.price, moneyConfig) }} so'm
               </v-chip>
            </div>
         </section>
      </v-card>
      <div class="d-flex justify-space-between align-center">
         <h3 class="text-h6 my-3 text-grey-darken-4">Haydovchilar takliflari</h3>
         <AddForm />
      </div>
      <section>
         <Card v-for="offer in offersStore.offers" :offer="offer" :key="offer.id"/>
      </section>
   </section>
</template>

<script setup lang="ts">
import { PassengerRepository, IPassenger } from '@/features/Passengers'
import { AddForm, Card, useOffersPassenger } from '@/features/OffersPassenger'
import { onMounted, ref, Ref, provide, onUnmounted } from 'vue'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
const props = defineProps(['id'])
const passenger: Ref<IPassenger> = ref(null)
const offersStore = useOffersPassenger()

provide('passenger', passenger)


onMounted(async () => {
   passenger.value = await PassengerRepository.show(props.id)
   offersStore.offers = passenger.value.offers
})

onUnmounted(async () => offersStore.offers = null)
</script>
<style scoped>
.middle-line {
   border-top: 1px dashed #ccc;
   flex-grow: 1;
}
</style>