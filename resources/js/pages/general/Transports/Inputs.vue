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
			<v-select :disabled="formData.car_company_id == null" :items="pageData.cars" v-model="formData.car_id"
				label="Transport turi" item-title="name" :item-value="(item) => item.id" :rules="rules"
				:loading="pageData.car_input_loading" />
		</v-col>
		<v-col sm="6" cols="12">
			<div class="d-flex justify-space-between mb-2">
				<v-sheet @click="formData.number_variant = true" :class="{'tw-bg-pink-50 tw-border-pink-600': formData.number_variant }" :height="26" v-ripple class="tw-border rounded tw-border-gray-700 d-flex">
					<div :class="{'tw-border-pink-600': formData.number_variant }" class="d-flex justify-space-between align-center px-2 tw-border tw-border-gray-700">
						00
					</div>
					<div :class="{'tw-border-pink-600': formData.number_variant }" class="d-flex justify-space-between align-center px-2 tw-border tw-border-gray-700 flex-grow-1">
						A 000 AA 
					</div>
				</v-sheet>
				<v-sheet @click="formData.number_variant = false" :class="{'tw-bg-pink-50 tw-border-pink-600': !formData.number_variant }"  :height="26" v-ripple class="tw-border rounded tw-border-gray-700 d-flex">
					<div :class="{'tw-border-pink-600': !formData.number_variant }" class="d-flex justify-space-between align-center px-2 tw-border tw-border-gray-700">
						00
					</div>
					<div :class="{'tw-border-pink-600': !formData.number_variant }" class="d-flex justify-space-between align-center px-2 tw-border tw-border-gray-700 flex-grow-1">
						000 AAA 
					</div>
				</v-sheet>
			</div>
			<v-text-field v-model="formData.number" v-maska:[mask] label="Transport raqami" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-select :items="pageData.fuel_types" v-model="formData.fuel_type" label="Yoqilg'i turi" item-title="name"
				:item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-switch v-model="formData.trunk" label="Bagaj" class="px-2"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { rules } from '@/modules/constants'
import { computed, reactive, ref } from 'vue'



const mask = computed(() => {
	const a = {
		mask: '## A ### AA',
		tokens: {
			A: { pattern: /[A-Z]/, transform: (chr: string) => chr.toUpperCase() }
		}
	}
	const b = {
		mask: '## ### AAA',
		tokens: {
			A: { pattern: /[A-Z]/, transform: (chr: string) => chr.toUpperCase() }
		}
	}

	return formData.number_variant ? a : b
})


const formData = reactive({
	car_company_id: null,
	car_id: null,
	number: null,
	fuel_type: null,
	trunk: false,
	number_variant: true,
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
	await axios.get(`car/${company_id}`).then(({ data: cars }) => {
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