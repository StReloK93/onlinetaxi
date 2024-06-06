<template>
	<v-row>
		<template v-for="(city, index) in formData.ends">
			<v-col v-if="index == 0" cols="12" class="py-1">
				<v-label class="text-subtitle-1 mr-1">
					Qaerdan?
				</v-label>
				<!-- <v-btn size="x-small" @click="addCity" :disabled="formData.ends.length == 4" icon="mdi-plus"
						variant="plain"></v-btn> -->
			</v-col>
			<!-- <v-col v-if="[1].includes(index) && index != formData.ends.length - 1" cols="12" class="py-0">
				<v-label class="text-subtitle-1 mr-1">
					Oraliq manzillar
				</v-label>
			</v-col> -->
			<v-col v-if="formData.ends.length == index + 1" cols="12" class="py-1">
				<v-label class="text-subtitle-1 mr-1">
					Qaerga?
				</v-label>
			</v-col>
			<div class="w-100 d-flex flex-wrap bg-blue-grey-lighten-5"
				:class="{ 'px-0': isFirstOrLast(index, formData.ends) == false }">
				<v-col sm="6" cols="12">
					<v-autocomplete v-model="city.region" @update:model-value="(id) => regionChanged(id, index)"
						:items="pageData.regions" label="Viloyat" item-title="name" :item-value="(item) => item.id"
						:rules="rules" />
				</v-col>
				<v-col sm="6" cols="12" class="d-flex align-center">
					<v-autocomplete :disabled="city.region == null" v-model="city.city" :items="city.districts"
						label="Shahar (Tuman)" item-title="name" :item-value="(item) => item.id" :loading="city.loading"
						:rules="rules" />
					<v-btn v-if="isFirstOrLast(index, formData.ends) == false" @click="removeCity(index)" size="x-small"
						icon="mdi-minus" class="ml-2" variant="plain" />
				</v-col>
			</div>
		</template>
		<v-divider class="border-opacity-75"></v-divider>
		<v-col sm="6" cols="12">
			<VDatePicker :trim-weeks="true" color="pink" :min-date="new Date()" v-model.string="formData.day"
				:masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="dateTime" is24hr transparent borderless expanded
				hide-time-header is-required />
			<v-text-field class="hidden tw-relative -tw-top-2" hidden v-model="formData.day" :rules="rules" readonly />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete class="mb-3" @update:model-value="setPhone" :items="pageData.cars" v-model="formData.user_car_id"
				label="Transport" :item-title="(item) => `${item.car?.name} ( ${item.number} )`"
				:item-value="(item) => item.id" :rules="rules" />

			<BaseUzPhoneInput v-model="formData.phone" />
			<v-text-field label="Narxi" :rules="rules" v-model.lazy="formData.price" class="mb-3" />
			<v-text-field v-model="formData.free_seat" type="number" label="Bosh o'rindiqlar" class="mb-3" :rules="rules" />
			<input v-money3="moneyConfig" v-model.lazy="formData.price" type="text" hidden>
			<v-switch v-model="formData.strictly_on_time" label="Qat'iy shu vaqtda" class="px-2"></v-switch>
			<v-switch v-model="formData.address_to_address" label="Manzilgacha" class="px-2"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import axios from "@/modules/AxiosClient";
import { moneyConfig, rules } from '@/modules/constants'
import { reactive, onMounted } from 'vue'
import { TransportRepository } from "@/features/Transports";
const emit = defineEmits(['onReady'])



function isFirstOrLast(index, array) {
	return index === 0 || index === array.length - 1;
}

const formData = reactive({
	user_car_id: null,
	phone: null,
	strictly_on_time: false,
	address_to_address: false,
	ends: [
		{ region: null, city: null, loading: false, districts: [] },
		{ region: null, city: null, loading: false, districts: [] },
	],
	day: null,
	price: "",
	free_seat: null,
})

const pageData = reactive({
	overlay: true,
	cars: [],
	regions: [],
})

function removeCity(index) {
	formData.ends.splice(index, 1);
}

function setPhone(id) {
	const car = pageData.cars.find((car) => car.id == id)
	formData.phone = car.user.phone
}

async function regionChanged(id, index) {
	formData.ends[index].loading = true
	formData.ends[index].city = null
	formData.ends[index].districts = []
	await axios.get(`district/${id}`).then(({ data }) => {
		formData.ends[index].districts = data
		formData.ends[index].loading = false
	})
}



defineExpose({ regionChanged, formData })

// function addCity() {
// 	if (formData.ends.length == 4) return
// 	formData.ends.splice(1, 0, { region: null, city: null, loading: false, districts: [] });
// }

onMounted(async () => {
	const { data: regions } = await axios.get('region')
	pageData.regions = regions

	const transports = await TransportRepository.onlyAuthUser()
	pageData.cars = transports

	emit('onReady')
})
</script>