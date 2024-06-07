<template>
   <v-dialog v-model="props.dialog" scrollable persistent width="850px">
      <v-card @vue:unmounted="ride = null" class="tw-relative">
         <v-card-title>{{ ride?.user_car.number }}</v-card-title>
         <v-card-text class="px-4 py-3 d-flex flex-column" style="height: 400px">
            <main class="d-flex justify-space-between tw-relative">
               <div class="tw-border-b tw-absolute tw-w-full tw-z-0 tw-bottom-[9px] tw-border-dashed tw-border-gray-400">
               </div>
               <div v-for="(city, index) in ride?.cities"
                  :class="[ride?.cities.length == index + 1 ? 'tw-text-right' : '']"
                  class="bg-white tw-relative px-2 -tw-mx-2">
                  <header :class="[index != 0 && ride?.cities.length - 1 != index ? 'text-center' : '']"
                     class="tw-text-xs tw-text-gray-400">
                     {{ city.district.region.name }}
                  </header>
                  <footer class="tw-text-base">
                     {{ city.district.name }}
                  </footer>
               </div>
            </main>
            <aside class="text-right my-2 tw-text-xl tw-text-pink-600 tw-font-semibold">
               {{ ride?.price }} so'm
            </aside>
            <v-spacer v-if="ride">
               <table class="w-100 tw-border-collapse tw-text-sm">
                  <tr>
                     <td class="tw-border tw-p-1 tw-bg-gray-100">
                        Telefon
                     </td>
                     <td class="tw-border tw-p-1 tw-bg-gray-100">
                        Manzil
                     </td>
                     <td class="tw-border tw-p-1 tw-bg-gray-100">
                        Boriladigan manzil
                     </td>
                     <td class="tw-border tw-p-1 tw-bg-gray-100">
                        Soni
                     </td>
                     <td class="tw-border tw-p-1 tw-bg-gray-100">
                        Kiritildi
                     </td>
                  </tr>
                  <tr v-for="passenger in ride.passengers">
                     <td class="tw-border px-1" >
                        {{ passenger.phone }}
                        <input v-maska:[phoneMask] v-model="passenger.phone" hidden>
                     </td>
                     <td class="tw-border px-1 tw-w-36 tw-leading-4">
                        {{ passenger.address }}
                     </td>
                     <td class="tw-border px-1" >
                        {{ passenger.end.region.name.replace('shahri', '').replace("viloyati", "") }}
                        {{ passenger.end.name }} {{ aviablePassengersCount }}
                     </td>
                     <td class="tw-border px-1 tw-text-center">
                        <div v-for="(n,index) in passenger.count">
                           <v-icon size="small" color="pink">mdi-account</v-icon>
                        </div>
                     </td>
                     <td class="tw-border px-1" >
                        <div class="d-flex justify-space-between align-center">
                           {{ moment(passenger.created_at).format('YYYY.MM.DD HH:mm') }}
                           <main>
                              <v-btn size="x-small" icon="mdi-pencil" @click="editPassengerForm.toggle(passenger)"
                                 variant="tonal" class="mr-1"></v-btn>
                              <v-btn size="x-small" icon="mdi-delete" variant="tonal" :loading="passenger.loading"
                                 @click="deletePassenger(passenger.id)"></v-btn>
                           </main>
                        </div>
                     </td>
                  </tr>
                  
                  <tr v-if="ride.free_seat >= aviablePassengersCount" v-for="passenger in (ride.free_seat - aviablePassengersCount)">
                     <td class="tw-border tw-h-[42px]"></td>
                     <td class="tw-border"></td>
                     <td class="tw-border"></td>
                     <td class="tw-border"></td>
                     <td class="tw-border"></td>
                  </tr>
                  <tr v-else>
                     <td class="tw-border tw-h-[42px]" colspan="6">
                        Mo'ljallangandan ortiqcha yo'lovchi biriktirilgan
                     </td>
                  </tr>
               </table>
               <div class="py-1 d-flex justify-end">
                  <AddPassenger :ride="ride" @create="createPassenger"
                     :disabled="aviablePassengersCount == ride.free_seat" />
                  <EditPassenger :ride="ride" @update="updatePassenger" ref="editPassengerForm" />
               </div>
            </v-spacer>
         </v-card-text>
         <v-divider class="border-opacity-50"></v-divider>
         <v-card-actions>
            <v-btn v-if="ride?.phone" tag="a" prepend-icon="mdi-phone" :href="`tel:${ride?.phone}`"
               class="tw-inline-flex tw-items-center">
               <input type="text" class="tw-w-[144px]" v-maska:[phoneMask] v-model="ride.phone" disabled hidden> {{
                  ride.phone }}
            </v-btn>
            <v-btn @click="setInactive" :loading="loading" prepend-icon="mdi-car-arrow-right" color="primary" type="submit" class="ml-4" variant="tonal">
               Junatish
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="props.dialog = false">
               Yopish
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script setup lang="ts">
import axios from '@/modules/AxiosClient'
import { reactive, ref, Ref, computed } from 'vue'
import { ICarRide } from '@/interfaces'
import { useMainStore } from '@/store/useMainStore'
import { moment } from '@/modules'
import AddPassenger from './Passenger/Add.vue'
import EditPassenger from './Passenger/Edit.vue'
import { phoneMask } from '@/modules/constants'
import { useCarRide } from '@/store/CarRide'



const loading = ref(false)

const CarRide = useCarRide()
const props = reactive({ dialog: false })
const editPassengerForm = ref()

const mainStore = useMainStore()

const ride: Ref<ICarRide> = ref(null)
function getCarRide(ride_id) {
   axios.get<ICarRide>(`car-ride/${ride_id}`).then(async ({ data }) => {
      data.passengers.forEach((pass) => pass.loading = false)
      ride.value = data
   })
}

function createPassenger(data) {
   ride.value.passengers.push(data)
   CarRide.createPassenger(data)
}


function updatePassenger(updated_passenger) {
   const index = ride.value.passengers.findIndex((passenger) => passenger.id == updated_passenger.id)
   ride.value.passengers[index] = updated_passenger
   CarRide.updatePassenger(updated_passenger)
}

async function deletePassenger(id) {
   mainStore.dialog.open(() => {
      mainStore.dialog.title = "Aniq o'chirmoqchimisiz ?"
      mainStore.dialog.submit = async () => {

         const selected = ride.value.passengers.find((passenger) => passenger.id == id)
         selected.loading = true
         await axios.delete(`passenger/${id}/delete`).then(() => {
            ride.value.passengers = ride.value.passengers.filter((passenger) => passenger.id != id)
            CarRide.deletedPassenger(selected)
         }).catch(() => selected.loading = false)

      }
   })

}

function setInactive() {
   mainStore.dialog.open(() => {
      mainStore.dialog.title = "Haydovchi qatnovga junatildimi ?"
      mainStore.dialog.submit = async () => {
         loading.value = true
         await CarRide.setInactive(ride.value)
         loading.value = false
         props.dialog = false
      }
   })
}


const aviablePassengersCount = computed(() => ride.value.passengers.reduce((acc, pass) => acc += pass.count, 0))

const openModal = (ride_id) => {
   props.dialog = true
   getCarRide(ride_id)
}
defineExpose({ openModal })
</script>