import { defineStore } from "pinia";
import { ref } from "vue";
export const useOffersPassenger = defineStore("useOffersPassenger", () => {
   const offers = ref([]);


   function create(offer) {
      offers.value.unshift(offer)
   }

	function update(offer) {
		const index = offers.value.findIndex((offerPassenger) => offerPassenger.id == offer.id)
		offers.value[index] = offer
   }
   
	async function destroy(offer_id) {
		offers.value = offers.value.filter((offerPassenger) => offerPassenger.id != offer_id)
	}



   return { offers, create, update, destroy }
});
