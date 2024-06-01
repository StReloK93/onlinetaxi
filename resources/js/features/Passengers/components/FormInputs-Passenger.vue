<template>
	<v-row>
		<v-col sm="6" cols="12">
			<v-label class="text-caption">
				Boshlangich manzil (Qaerdan?)
			</v-label>
			<v-autocomplete @update:model-value="(id) => regionChanged(id, 'start')" :items="pageData.regions"
				v-model="formData.start_region" label="Viloyat" item-title="name" :item-value="(item) => item.id"
				:rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete :disabled="formData.start_region == null" :items="pageData.start_districts"
				v-model="formData.start_city" label="Shahar (Tuman)" item-title="name" :loading="pageData.start_loading"
				:item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-divider></v-divider>
		<v-col sm="6" cols="12">
			<v-label class="text-caption">
				Boriladigan manzil (Qaerga?)
			</v-label>
			<v-autocomplete @update:model-value="(id) => regionChanged(id, 'end')" :items="pageData.regions"
				v-model="formData.end_region" label="Viloyat" item-title="name" :item-value="(item) => item.id"
				:rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete :disabled="formData.end_region == null" :items="pageData.end_districts"
				v-model="formData.end_city" label="Shahar (Tuman)" item-title="name" :item-value="(item) => item.id"
				:loading="pageData.end_loading" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<VDatePicker :trim-weeks="true" color="pink" :min-date="new Date()" v-model.string="formData.ride_time"
				:masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="dateTime" is24hr transparent borderless expanded
				hide-time-header is-required />
		</v-col>
		<v-divider></v-divider>
		<v-col sm="6" cols="12">
			<BaseUzPhoneInput v-model="formData.phone" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.address" :step="900" label="Yo'lovchining manzili" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.count" label="Necha kishi" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.price" label="Yo'lkira narxi" type="number" :rules="rules" />
		</v-col>

		<v-col sm="6" cols="12">
			<v-switch v-model="formData.with_trunk" label="Bagaj"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import axios from '@/repository/Clients/AxiosClient'
import { IPassenger } from '@/app/interfaces'
import { rules } from '@/modules/constants'
import { reactive } from 'vue'
const emit = defineEmits(['onReady'])


const formData: IPassenger = reactive({
	car_ride_id: null,
	loading: null,
	phone: null,
	address: null,
	start_region: null,
	start_city: null,
	end_region: null,
	end_city: null,
	with_trunk: false,
	ride_time: null,
	price: null,
	count: 1,
})

const pageData = reactive({
	start_loading: false,
	end_loading: false,
	regions: [],
	start_districts: [],
	end_districts: []
})

async function regionChanged(id, way) {
	pageData[`${way}_loading`] = true
	pageData[`${way}_districts`] = []
	formData[`${way}_city`] = null
	await axios.get(`district/${id}`).then(({ data }) => {
		pageData[`${way}_districts`] = data
		pageData[`${way}_loading`] = false
	})
}

axios.get('region').then(({ data: regions }) => {
	pageData.regions = regions
	emit('onReady')
})
defineExpose({ regionChanged, formData })
</script>