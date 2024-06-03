<template>
   <v-card class="pa-2 mb-2">
      <main class="leading-none text-h6">
         {{ props.offer.user_car.car.name }}
      </main>
      <div class="text-caption d-inline-flex align-center">
         {{ props.offer.user_car.fuel.name }}
         <v-icon color="primary">mdi-water-opacity</v-icon>
      </div>
      <section class="d-flex justify-space-between align-center mx-n2">
         <div class="leading-none pl-2">
            <span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
               {{ moment(props.offer.ride_time).format('D-MMMM HH:mm') }}
            </span>
         </div>
         <div class="d-flex">
            <EditForm :id="props.offer.id" />
            <v-btn icon="mdi-delete" size="x-small" @click="passengerDelete" variant="plain"></v-btn>
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
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => OfferPassengerRepository.destroy(props.offer.id)
	})
}
</script>