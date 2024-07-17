<template>
	<v-row>
		<BaseSelectCity :categories="pageData.regions" :subCategories="pageData.districts" :loading="pageData.start_loading"
			v-model="formData.start_city" startText="Qayerdan?" class="mb-1" />
		<BaseSelectCity :categories="pageData.regions" :subCategories="pageData.districts" :loading="pageData.end_loading"
			v-model="formData.end_city" startText="Qayerga?" class="mb-1" />
		<BaseSelectTimeInput v-model:datetime="formData.ride_time" />
		<v-col cols="12">
			<BaseUzPhoneInput v-model="formData.phone" class="mb-4" />
			<v-label class="v-label text-caption">
				Necha kishi =  {{ formData.count }}
			</v-label>
			<main class="w-100 overflow-hidden mt-n1">
				<v-rating color="dark" empty-icon="mdi-account-outline"
					full-icon="mdi-account" v-model="formData.count" size="small" length="6" class="mx-n3"></v-rating>
			</main>
			<v-text-field v-model.lazy="formData.price" label="Yo'lkira narxiga taklifingiz" inputmode="numeric" :rules="rules"
				class="mb-4" />
			<input v-money3="moneyConfig" v-model.lazy="formData.price" type="text" hidden />
			<v-text-field v-model="formData.address" :step="900" label="Yo'lovchining manzili"
				hint="Ushbu manzilga qarab haydovchi sizni olib ketadi" :rules="rules" class="mb-4" />
			<v-switch v-model="formData.with_trunk" label="Ustki bagaj"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import BaseSelectTimeInput from '@/components/BaseSelectTimeInput.vue'
import BaseSelectCity from '@/components/BaseSelectCity.vue'
import axios from '@/modules/AxiosClient'
import { IPassenger } from '@/interfaces'
import { moneyConfig, rules } from "@/modules/constants";
import { reactive, onMounted, watch } from 'vue'
import { useAuthStore } from "@/store/useAuthStore"
const AuthStore = useAuthStore()

const emit = defineEmits(['onReady'])

const formData: IPassenger = reactive({
	car_ride_id: null,
	loading: null,
	phone: AuthStore.user.phone,
	address: null,
	start_region: null,
	start_city: null,
	end_region: null,
	end_city: null,
	with_trunk: false,
	ride_time: null,
	price: "",
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
watch(() => formData.count, (currentValue) => {
	if (currentValue < 1) return formData.count = 1
})

defineExpose({ regionChanged, formData })

onMounted(async () => {
	const { data: regions } = await axios.get("region");
	pageData.regions = regions;

	const { data: districts } = await axios.get("district");
	pageData.districts = districts;

	emit("onReady");
});
</script>