<template>
   <v-card class="pa-2 pb-0 border-b border-primary border-opacity-100 rounded-b-0 passenger-card">
      <main class="d-flex align-end mb-3">
         <aside class="pr-2 leading-none">
            <v-label class="text-caption mr-1">
               Qayerdan
            </v-label>
            <div>
               {{ props.passenger?.start.name }}
            </div>
         </aside>
         <div class="middle-line mb-2 position-relative">
            <v-icon color="primary" class="position-absolute chevron-left-icon">mdi-chevron-right</v-icon>
         </div>
         <aside class="pl-2 leading-none text-right">
            <v-label class="text-caption mr-1">
               Qayerga
            </v-label>
            <div>
               {{ props.passenger?.end.name }}
            </div>
         </aside>
      </main>
      <main class="mb-2 d-flex justify-space-between">
         <div>
            <span v-for="item in props.passenger?.count">
               <v-icon size="small" color="primary">mdi-account</v-icon>
            </span>
         </div>
         <div>
            <v-btn v-if="Auth.isDriverAdmins || Auth.user?.id == props.passenger.user_id"
               :to="{ name: 'passenger-offers', params: { id: props.passenger?.id } }" :size="40" variant="plain" stacked>
               <v-icon size="x-small">
                  mdi-message-badge
               </v-icon>
               <!-- <span class="text-caption">
                  3
               </span> -->
            </v-btn>
         </div>
      </main>
      <section class="d-flex justify-space-between align-center mx-n2">
         <div v-if="props.passenger?.ride_time" class="leading-none pl-2">
            <p class="text-grey-darken-1 mb-n2 text-caption">
               {{ moment(passenger.ride_time).format('HH:mm') }}
            </p>
            <span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
               {{ moment(passenger.ride_time).format('D-MMMM') }}
            </span>
         </div>
         <div v-else style="height: 44px;"></div>
         <div class="d-flex">
            <div class="leading-none" v-if="crud && (Auth.isAnyAdmins || Auth.user?.id == props.passenger.user_id)">
               <v-btn v-if="Auth.isAnyAdmins" tag="a" :href="`tel:+998${props.passenger.phone}`" size="x-small"
                  variant="plain" color="teal" icon="mdi-phone" />
               <EditForm :id="props.passenger?.id"></EditForm>
               <v-btn size="x-small" @click="passengerDelete" variant="plain" icon="mdi-delete" />
            </div>
            <v-chip variant="tonal" color="primary" class="font-weight-medium rounded-e-0">
               {{ format(props.passenger?.price, moneyConfig) }} so'm
            </v-chip>
         </div>
      </section>
   </v-card>
</template>

<script setup lang="ts">
import { EditForm, usePassengerStore } from '@/features/Passengers';
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const props = defineProps(['passenger', 'crud'])

const Auth = useAuthStore()
const store = useMainStore()
const passengerStore = usePassengerStore()

function passengerDelete() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => passengerStore.destroy(props.passenger.id)
	})
}

</script>
<style scoped>
.middle-line {
   border-top: 1px dashed #ccc;
   flex-grow: 1;
}

.chevron-left-icon {
   right: -10px;
   top: -13px;
}

.passenger-card:last-child {
   margin-bottom: 2px !important;
}

.passenger-card:first-child {
   margin-top: 2px !important;
}
</style>