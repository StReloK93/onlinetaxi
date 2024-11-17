<template>
   <section class="pa-2">
      <WhatIsOffer />
      <PassengerInformation :crud="false" :passenger="passenger" />
      <div class="d-flex justify-space-between align-center">
         <AddForm v-if="AuthStore.user?.id != passenger?.user_id" />
      </div>
      <section>
         <p class="my-1 text-grey-darken-4">Takliflar</p>
         <TransitionGroup name="list">
            <template v-if="offersStore.offers?.length">
               <Card
                  v-for="offer in offersStore.offers"
                  :offer="offer"
                  :key="offer.id"
               />
            </template>
            <v-alert v-else text="Taklif qoldirilmagan..." />
         </TransitionGroup>
      </section>
   </section>
</template>

<script setup lang="ts">
import WhatIsOffer from "@/studyComponents/WhatIsOffer.vue";
import { PassengerRepository, IPassenger } from "@/features/Passengers";
import {
   AddForm,
   Card,
   useOffersPassenger,
   PassengerInformation,
} from "@/features/OffersPassenger";
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { useAuthStore } from "@/store/useAuthStore";

const AuthStore = useAuthStore();
const props = defineProps(["id"]);
const passenger: Ref<IPassenger> = ref(null);
const offersStore = useOffersPassenger();

onMounted(async () => {
   offersStore.offers = await PassengerRepository.getOffers(props.id);
   passenger.value = await PassengerRepository.show(props.id);
});
onUnmounted(() => (offersStore.offers = null));
</script>
