<template>
   <v-card class="pa-2 pb-0 mb-2">
      <main class="d-flex mb-2 justify-space-between">
         <div>
            <span class="leading-none text-h6">
               {{ props.offer.user_car?.car.name }}
            </span>
            <span class="text-caption d-inline-flex align-center ml-2">
               <v-icon color="primary">mdi-water-opacity</v-icon>
               {{ props.offer.user_car?.fuel.name }}
            </span>
         </div>
         <div>
            <a :href="`tel:+998${props.offer?.user.phone}`.replace(/\s/g, '')">
               <v-btn size="x-small" variant="plain" color="teal" icon="mdi-phone" />
            </a>
         </div>
      </main>
      <section class="d-flex justify-space-between align-center mx-n2">
         <div class="leading-none pl-2 d-flex flex-column">
            <span class="text-grey-darken-1 mb-n2 text-caption">
               {{ moment(props.offer.ride_time).format('HH:mm') }}
            </span>
            <span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
               {{ moment(props.offer.ride_time).format('D-MMMM') }}
            </span>
         </div>
         <div class="d-flex">
            <span v-if="Auth.user.id == props.offer.user_id">
               <EditForm :id="props.offer.id" />
               <v-btn icon="mdi-delete" size="x-small" @click="passengerDelete" variant="plain"></v-btn>
            </span>
            <v-chip variant="tonal" color="primary" class="font-weight-medium rounded-e-0">
               {{ format(props.offer.price, moneyConfig) }} so'm
            </v-chip>
         </div>
      </section>
   </v-card>
</template>

<script setup lang="ts">
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { EditForm, OfferPassengerRepository } from '@/features/OffersPassenger'

import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const Auth = useAuthStore()
const store = useMainStore()
const props = defineProps(['offer'])

function passengerDelete() {
   store.dialog.open(() => {
      store.dialog.title = "Taklifni o'chirmoqchimisiz ?"
      store.dialog.submit = () => OfferPassengerRepository.destroy(props.offer.id)
   })
}
</script>