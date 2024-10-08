import Client from "@/modules/AxiosClient";
import { ICarRide } from '@/interfaces'
const resource = "car-ride";

class CarRide{
   async getOnlyActive() {
      const { data } = await Client.get<ICarRide[]>(`${resource}/only/active`);
      return data;
   }
   
   async index() {
      const { data } = await Client.get<ICarRide[]>(`${resource}`);
      return data
   }
   
   async show(ride_id) {
      const { data } = await Client.get<ICarRide>(`${resource}/${ride_id}`);
      return data
   }
   
   async create(formData) {
      const { data } = await Client.post<ICarRide>(`${resource}`, formData);
      return data
   }
   
   async update(ride_id, formData) {
      const { data } = await Client.put<ICarRide>(`${resource}/${ride_id}`, formData);
      return data
   }
   
   async destroy(ride_id) {
      await Client.delete(`${resource}/${ride_id}`);
   }
}

export default new CarRide()