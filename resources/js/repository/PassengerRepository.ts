import Client from "./Clients/AxiosClient";
import { IPassenger } from "@/app/interfaces";


export function index() {

}

export async function store(formData) {
    const { data } = await Client.post<IPassenger>('passenger', formData)
    return data
}