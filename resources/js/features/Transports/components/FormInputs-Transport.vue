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
				v-model="formData.car_company_id" label="Transport markasi" item-title="name" :item-value="(item) => item.id"
				:rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-select :disabled="formData.car_company_id == null" :items="pageData.cars" v-model="formData.car_id"
				label="Transport turi" item-title="name" :item-value="(item) => item.id" :rules="rules"
				:loading="pageData.car_input_loading" />
		</v-col>
		<v-col sm="6" cols="12" class="py-0">
			<v-label class="text-caption">
				Transport raqami turini tanlang
			</v-label>
			<div class="d-flex justify-space-between mb-2">
				<v-sheet @click="formData.number_variant = true"
					:class="{ 'border-primary border-opacity-100': formData.number_variant }" :height="26" v-ripple
					class="border rounded d-flex position-relative">
					<div :class="{ 'border-primary border-opacity-100': formData.number_variant }" class="d-flex justify-center align-center checked-type border">
						<v-icon v-if="formData.number_variant" color="primary" size="small">
							mdi-check
						</v-icon>
					</div>
					<div :class="{ 'border-primary border-opacity-100': formData.number_variant }"
						class="d-flex justify-space-between align-center pl-1 pr-4 border flex-grow-1">
						A 000 AA <img src="/iconos/uz.png" class="position-absolute uz-flag">
					</div>
				</v-sheet>
				<v-sheet @click="formData.number_variant = false"
					:class="{ 'border-primary border-opacity-100': !formData.number_variant }" :height="26" v-ripple
					class="border rounded d-flex position-relative">
					<div :class="{ 'border-primary': !formData.number_variant }" class="d-flex justify-center align-center checked-type border">
						<v-icon v-if="!formData.number_variant" color="primary" size="small">
							mdi-check
						</v-icon>
					</div>
					<div :class="{ 'border-primary': !formData.number_variant }" class="d-flex justify-space-between align-center pl-1 pr-4 border flex-grow-1">
						000 AAA <img src="/iconos/uz.png" class="position-absolute uz-flag">
					</div>
				</v-sheet>
			</div>
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.number" v-maska:[mask] label="Transport raqamini kiriting" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-select :items="pageData.fuel_types" v-model="formData.fuel_type" label="Yoqilg'i turi" item-title="name"
				:item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-switch v-model="formData.trunk" label="Ustki bagaj" class="px-2"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import axios from '@/repository/Clients/AxiosClient'
import { rules } from '@/modules/constants'
import { computed, reactive, onMounted } from 'vue'
const emit = defineEmits(['onReady'])


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


defineExpose({ formData, carMarkChanged })

onMounted(async () => {
	const { data: fuel_types } = await axios.get('fuel-type')
	pageData.fuel_types = fuel_types
	const { data: car_company } = await axios.get('car-company')
	pageData.car_company = car_company
	emit('onReady')
})
</script>
<style scoped>
.uz-flag{
	top: 2px;
	right: 2px;
	width: 12px;
}
.checked-type{
	width: 28px;
}
 
</style>