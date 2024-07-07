<template>
	<v-row>
		<BaseSelectCity
			:categories="pageData.regions"
			:subCategories="pageData.districts"
			:loading="pageData.start_loading"
			v-model="formData.start_city"
			startText="Qayerdan?"
			class="mb-1"
		/>
		<BaseSelectCity
			:categories="pageData.regions"
			:subCategories="pageData.districts"
			:loading="pageData.end_loading"
			v-model="formData.end_city"
			startText="Qayerga?"
			class="mb-1"
		/>

		<v-col sm="6" cols="12">
			<VDatePicker :trim-weeks="true" color="pink" :min-date="new Date()" v-model.string="formData.ride_time"
				:masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="dateTime" is24hr transparent borderless expanded
				hide-time-header is-required />
		</v-col>

		<v-col sm="6" cols="12">
			<BaseUzPhoneInput v-model="formData.phone" class="mb-4" />
			<v-text-field v-model="formData.count" label="Necha kishi" :rules="rules" class="mb-4" />
			<v-text-field v-model="formData.price" label="Yo'lkira narxi" type="number" :rules="rules" class="mb-4" />
			<v-text-field v-model="formData.address" :step="900" label="Yo'lovchining manzili" :rules="rules" class="mb-4" />
			<v-switch v-model="formData.with_trunk" label="Ustki bagaj"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import BaseSelectCity from '@/components/BaseSelectCity.vue'
import axios from '@/modules/AxiosClient'
import { IPassenger } from '@/interfaces'
import { rules } from '@/modules/constants'
import { reactive, onMounted } from 'vue'
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
	districts: [],
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

defineExpose({ regionChanged, formData })

onMounted(async () => {
   const { data: regions } = await axios.get("region");
   pageData.regions = regions;

   const { data: districts } = await axios.get("district");
   pageData.districts = districts;

   emit("onReady");
});
</script>