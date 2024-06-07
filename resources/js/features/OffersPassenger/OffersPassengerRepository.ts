import Client from "@/modules/AxiosClient";
import { IOffersPassenger } from "@/interfaces";
const resource = "offers-passenger"
import { useOffersPassenger } from "./OffersPassengerStore"

class OfferPassenger {

   async show(passenger_id) {
      const { data } = await Client.get<IOffersPassenger>(`${resource}/${passenger_id}`);
      return data;
   }

   async create(formData) {
      const { data: offer } = await Client.post<IOffersPassenger>(resource, formData);
      
      const offersStore = useOffersPassenger()
      offersStore.create(offer)
   }

   async update(offer_id, formData: IOffersPassenger) {
      const { data: offer } = await Client.put<IOffersPassenger>(`${resource}/${offer_id}`, formData);
      
      const offersStore = useOffersPassenger()
      offersStore.update(offer)
	}
	
	async destroy(offer_id) {
      await Client.delete<IOffersPassenger>(`${resource}/${offer_id}`);

      const offersStore = useOffersPassenger()
      offersStore.destroy(offer_id)
   }
}

export default new OfferPassenger();
