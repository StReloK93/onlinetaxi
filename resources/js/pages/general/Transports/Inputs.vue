<template>
	<section>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.type" :step="900" label="Transport turi" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.number" :step="900" label="Transport raqami" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.color" :step="900" label="Transport rangi" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete :items="pageData.fuel_types" v-model="formData.fuel_type" label="Yoqilg'i turi"
				item-title="name" :item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-switch v-model="formData.trunk" label="Bagaj" class="px-2"></v-switch>
		</v-col>
	</section>
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
	color: null,
	fuel_type: null,
	trunk: false,
})

const pageData = reactive({
	fuel_types: [],
	users: [],
	start_loading: false,
	end_loading: false,
	start_districts: [],
	end_districts: [],
})

axios.all([axios.get('fuel_type'), axios.get('users')])
	.then(axios.spread(({ data: fuel_types }, { data: users }) => {
		pageData.fuel_types = fuel_types
		pageData.users = users
	}))

defineExpose({ formData })
</script>