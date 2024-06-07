import FormInputs from '@/features/OffersPassenger/components/FormInputs-Offer.vue'
import AddForm from '@/features/OffersPassenger/components/AddForm-Offer.vue'
import EditForm from '@/features/OffersPassenger/components/EditForm-Offer.vue'
import Card from '@/features/OffersPassenger/components/Card-Offer.vue'
import PassengerInformation from '@/features/OffersPassenger/components/PassengerInformation.vue'
import type { IOffersPassenger } from '@/interfaces'
import OfferPassengerRepository from './OffersPassengerRepository';
import { useOffersPassenger } from './OffersPassengerStore'

export {
   FormInputs,
   AddForm,
   EditForm,
   IOffersPassenger,
   Card,
   PassengerInformation,
   OfferPassengerRepository,
   useOffersPassenger
};
