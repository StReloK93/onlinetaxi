<template>
   <v-card class=" border-primary border-opacity-100 bg-white elevation-1 rounded-e passenger-card">
      <section @click="$emit('activate', props.passenger?.id)" class="pa-2 pb-0" v-ripple>
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
         <main class="mb-2">
            <span v-for="item in props.passenger?.count">
               <v-icon size="small" color="primary">mdi-account</v-icon>
            </span>
         </main>
         <section class="d-flex justify-space-between align-center mx-n2">
            <div class="leading-none pl-2">
               <p class="text-grey-darken-1 mb-n2 text-caption">
                  {{ moment(props.passenger?.ride_time).format('HH:mm') }}
               </p>
               <span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
                  {{ moment(props.passenger?.ride_time).format('D-MMMM') }}
               </span>
            </div>
            <v-chip variant="tonal" color="primary" class="font-weight-medium rounded-e-0">
               {{ format(props.passenger?.price, moneyConfig) }} so'm
            </v-chip>
         </section>
      </section>
      <v-expand-transition>
         <div v-if="props.activeCard == props.passenger?.id" class="px-2">
            <section class="bg-grey-lighten-4 elevation-1 mx-n2 d-flex">
               <RouterLink :to="{ name: 'passenger-offers', params: { id: props.passenger?.id } }"
                  v-if="(Auth.isAnyAdmins || isMyAdd(props.passenger))">
                  <v-btn size="x-small" variant="text" icon="mdi-message-badge" />
               </RouterLink>
               <a :href="`tel:+998${props.passenger?.phone}`" v-if="Auth.isAnyAdmins">
                  <v-btn size="x-small" variant="text" icon="mdi-phone" color="teal" />
               </a>
               <div>
                  <EditForm :id="props.passenger?.id"></EditForm>
                  <v-btn size="x-small" variant="text" icon="mdi-delete" @click="passengerDelete" />
               </div>
            </section>
         </div>
      </v-expand-transition>
   </v-card>
</template>

<script setup lang="ts">
import { EditForm, usePassengerStore } from '@/features/Passengers';
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { ref } from 'vue';
const props = defineProps(['passenger', 'crud', 'activeCard'])

const Auth = useAuthStore()
const store = useMainStore()
const passengerStore = usePassengerStore()
const expand = ref(false)
function passengerDelete() {
   store.dialog.open(() => {
      store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
      store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
      store.dialog.submit = () => passengerStore.destroy(props.passenger.id)
   })
}


function isMyAdd(passenger) {
   return Auth.user?.id == passenger?.user_id
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


.passenger-card {
   border-top-left-radius: 0px;
   border-bottom-left-radius: 0px;
   border-left-style: solid;
   border-left-width: 2px !important;
   border-left-color: rgb(var(--v-theme-primary)) !important;

}

.passenger-card:last-child {
   margin-bottom: 2px !important;
}

.passenger-card:first-child {
   margin-top: 2px !important;
}
</style>