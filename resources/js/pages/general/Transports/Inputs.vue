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
			<v-autocomplete :items="pageData.car_company" v-model="pageData.car_company_id" label="Transport markasi"
				item-title="name" :item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.number" :step="900" label="Transport raqami" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete :items="pageData.fuel_types" v-model="formData.fuel_type" label="Yoqilg'i turi"
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
import { useAuthStore } from '@/store'
const auth = useAuthStore()
const formData = reactive({
	user_id: auth.user.id,
	type: null,
	number: null,
	fuel_type: null,
	trunk: false,
})

const pageData = reactive({
	car_company_id: null,
	fuel_types: [],
	users: [],
	car_company: [],
})

axios.all([axios.get('fuel_type'), axios.get('users'),  axios.get('car-company')])
	.then(axios.spread(({ data: fuel_types }, { data: users }, {data: car_company}) => {
		pageData.fuel_types = fuel_types
		pageData.users = users
		pageData.car_company = car_company
	}))


	
defineExpose({ formData })
</script>