<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn density="compact" v-bind="props" :disabled="parentProps.disabled">
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <BaseForm :submit="submitFunction" title="Yo'lovchi kiritish" @close="pageData.dialog = false" >
            <Inputs ref="inputComponent" :freeSeat="free_seat" />
        </BaseForm>
    </v-dialog>
</template>

<script setup lang="ts">
import axios from '@/modules/AxiosClient'
import { reactive, ref, computed } from 'vue'
import Inputs from './Inputs.vue'
import { IPassenger } from '@/interfaces'
const parentProps = defineProps(['ride', 'disabled'])
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false})

const free_seat = computed(() => {
    const aviablePassengers = parentProps.ride.passengers.reduce((acc, pass) => acc += pass.count, 0)
    return parentProps.ride.free_seat - aviablePassengers
})
async function submitFunction() {
    const formData: IPassenger = inputComponent.value.formData
    formData.start_city = parentProps.ride.cities[0].district_id
    formData.car_ride_id = parentProps.ride.id

    await axios.post<IPassenger>('passenger/operator', formData).then(({ data }) => {
        emit('create', data)
    })
}
</script>