<template>
	<v-row>
		<v-col sm="6" cols="12">
			<VDatePicker :trim-weeks="true" color="pink" :min-date="new Date(passenger.ride_time)"
				v-model.string="formData.ride_time" :masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="datetime" is24hr
				transparent borderless expanded hide-time-header is-required />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.price" label="Yo'lkira narxi" type="number" :rules="rules" class="mb-4" />
			<v-autocomplete class="mb-3" :items="transports" v-model="formData.user_car_id"
					label="Transport" :item-title="(item:any) => `${item.car?.name} ( ${item.number} )`"
					:item-value="(item:any) => item.id" :rules="rules" />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import client from '@/modules/AxiosClient';
import { IPassenger } from '@/features/Passengers'
import { rules } from '@/modules/constants'
import { reactive, inject, ref,Ref, onMounted } from 'vue'
const emit = defineEmits(['onReady'])

// provided in PassengerOfferPage
const passenger: Ref<IPassenger> = inject('passenger')
const transports = ref()

const formData = reactive({
	passenger_id: passenger.value.id,
	ride_time: null,
	price: null,
	user_car_id: null
})



defineExpose({ formData })

onMounted(async () => {
	const { data: cars } = await client.get('user-cars/get-only-my')
	transports.value = cars
	emit('onReady')
})
</script>