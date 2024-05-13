<template>
	<v-row>
		<v-col cols="12">
			<p class="text-caption">
				<v-icon class="mr-2" color="primary">
					mdi-bell
				</v-icon>
				<span class="text-blue-grey-lighten-1">
					Agarda sizning transportingiz ro'yhatda yo'q bo'lsa adminga murojat qiling!
				</span>
			</p>
		</v-col>
		<v-col sm="6" cols="12">
			<v-select @update:model-value="(id) => carMarkChanged(id)" :items="pageData.car_company"
				v-model="formData.car_company_id" label="Transport markasi" item-title="name"
				:item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-select :disabled="formData.car_company_id == null"
				:items="pageData.cars" v-model="formData.car_id" label="Transport turi" item-title="name"
				:item-value="(item) => item.id" :rules="rules" :loading="pageData.car_input_loading" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.number" :step="900" label="Transport raqami" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-select :items="pageData.fuel_types" v-model="formData.fuel_type" label="Yoqilg'i turi"
				item-title="name" :item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-switch v-model="formData.trunk" label="Bagaj" class="px-2"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { rules } from '@/modules/constants'
import { reactive } from 'vue'


const formData = reactive({
	car_company_id: null,
	car_id: null,
	number: null,
	fuel_type: null,
	trunk: false,
})

const pageData = reactive({
	car_company: [],
	fuel_types: [],
	cars: [],
	car_input_loading: false
})


async function carMarkChanged(company_id) {
	pageData.car_input_loading = true
	formData.car_id = null
	await axios.get(`car/${company_id}`).then(({ data:cars }) => {
		pageData.cars = cars
	})

	pageData.car_input_loading = false
}

axios.all([axios.get('fuel_type'), axios.get('car-company')])
	.then(axios.spread(({ data: fuel_types }, { data: car_company }) => {
		pageData.fuel_types = fuel_types
		pageData.car_company = car_company
	}))

defineExpose({ formData, carMarkChanged })
</script>