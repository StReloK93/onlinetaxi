<template>
	<v-row>
		<v-col cols="12" class="py-0 text-center">
			<v-label class="text-caption ">
				Boriladigan manzil (Qaerga?)
			</v-label>
		</v-col>
		<v-col sm="6" cols="12">
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
			<BaseUzPhoneInput v-model="formData.phone" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.address" :step="900" label="Manzil" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12" class="overflow-hidden px-1" >
			<v-rating
				density="compact"
				v-model="formData.count"
				empty-icon="mdi-account-outline"
				full-icon="mdi-account"
				class="d-flex flex-wrap"
				:length="propsParent.freeSeat + propsParent.familyCount"
				hover
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import axios from '@/modules/AxiosClient'
import { IPassenger } from '@/interfaces'
import { rules, phoneMask } from '@/modules/constants'
import { reactive } from 'vue'
const propsParent = defineProps({
	freeSeat: {type: Number, required: true},
	familyCount: {type: Number, default: 0},
})
const formData: IPassenger = reactive({
	car_ride_id: null,
	phone: null,
	loading: null,
	address: null,
	start_region: null,
	start_city: null,
	end_region: null,
	end_city: null,
	price: null,
	with_trunk: false,
	ride_time: null,
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

axios.get('region').then(({ data }) => pageData.regions = data)
defineExpose({ regionChanged, formData })
</script>