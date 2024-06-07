<template>
   <v-card class="pa-2 pb-0 border-b border-primary border-opacity-100 rounded-b-0">
      <main class="d-flex align-end mb-3">
         <aside class="pr-2 leading-none">
            <v-label class="text-caption mr-1">
               Qayerdan
            </v-label>
            <div>
               {{ passenger?.start.name }}
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
               {{ passenger?.end.name }}
            </div>
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
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import { PassengerRepository, IPassenger } from '@/features/Passengers'
import { useRoute } from 'vue-router'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'

const passenger: Ref<IPassenger> = ref(null)

const $route = useRoute()

onMounted(async () => {
   passenger.value = await PassengerRepository.show($route.params.id)
})
</script>
<style scoped>
.middle-line {
   border-top: 1px dashed #ccc;
   flex-grow: 1;
}

.chevron-left-icon{
   right: -10px;
   top: -13px;
}
</style>