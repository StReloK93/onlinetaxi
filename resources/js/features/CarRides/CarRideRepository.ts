import Client from "@/modules/AxiosClient";
import { ICarRide } from '@/app/interfaces'
const resource = "car-ride";

class CarRide{
   async getOnlyActive() {
      const { data } = await Client.get<ICarRide[]>(`${resource}/only/active`);
      return data;
   }
   
   // async getOnlyAuthUser() {
   //    const { data } = await Client.get<ICarRide[]>(`${resource}/only/auth-user`);
   //    return data;
   // }
   
   // async getOnlyInactive() {
   //    const { data } = await Client.get<ICarRide[]>(`${resource}/only/passive`);
   //    return data;
   // }
   
   async getRidesByRegion(region_id) {
      const { data } = await Client.get(`${resource}/start-region/${region_id}`);
      return { rides: data.car_rides, districts: data.districts };
   }
   
   async inactivate(ride_id) {
      await Client.get(`${resource}/inactivate/${ride_id}`);
   }

   async activate(ride_id) {
      await Client.get(`${resource}/activate/${ride_id}`);
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