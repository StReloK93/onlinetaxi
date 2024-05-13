<template>
	<v-row>
		<v-overlay v-if="edit" v-model="pageData.overlay" contained persistent class="align-center justify-center">
			<v-progress-circular color="primary" indeterminate :size="68"></v-progress-circular>
		</v-overlay>
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
				:class="{ 'px-0': [1, 2].includes(index) && index != formData.ends.length - 1 }">
				<v-col sm="6" cols="12">
					<v-autocomplete v-model="city.region" @update:model-value="(id) => regionChanged(id, index)"
						:items="pageData.regions" label="Viloyat" item-title="name" :item-value="(item) => item.id"
						:rules="rules" />
				</v-col>
				<v-col sm="6" cols="12" class="d-flex align-center">
					<v-autocomplete :disabled="city.region == null" v-model="city.city" :items="city.districts"
						label="Shahar (Tuman)" item-title="name" :item-value="(item) => item.id" :loading="city.loading"
						:rules="rules" />
					<v-btn @click="removeCity(index)" size="x-small" icon="mdi-minus" class="ml-2" variant="plain"
						v-if="[1, 2].includes(index) && index != formData.ends.length - 1" />
				</v-col>
			</div>
		</template>
		<v-divider class="border-opacity-75"></v-divider>
		<v-col v-if="date" sm="6" cols="12">
			<VDatePicker :trim-weeks="true" color="pink" :min-date="new Date()" v-model.string="formData.day"
				:masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="dateTime" is24hr transparent borderless expanded
				hide-time-header is-required />
			<v-text-field class="hidden tw-relative -tw-top-2" hidden v-model="formData.day" :rules="rules" readonly />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete class="mb-3" @update:model-value="setPhone" :items="pageData.cars" v-model="formData.user_car_id"
				label="Transport" :item-title="(item) => `${item.car.name} ( ${item.number} )`" :item-value="(item) => item.id"
				:rules="rules" />
			<main class="d-flex w-100 mb-3">
				<v-text-field class="pr-2 flex-0-0" readonly density="compact" value="+998" disabled>
					<template v-slot:prepend-inner>
						<v-icon>
							<img src="/iconos/uz.png">
						</v-icon>
					</template>
				</v-text-field>
				<v-text-field v-maska:[phoneMask] v-model="formData.phone" density="compact" :rules="rules" />
			</main>
			<v-text-field label="Narxi" :rules="rules" v-model.lazy="formData.price" class="mb-3" />
			<v-text-field v-model="formData.free_seat" type="number" label="Bosh o'rindiqlar" class="mb-3" :rules="rules" />
			<input v-money3="moneyConfig" v-model.lazy="formData.price" type="text" hidden>
			<v-switch v-model="formData.strictly_on_time" label="Qat'iy shu vaqtda" class="px-2"></v-switch>
			<v-switch v-model="formData.address_to_address" label="Manzilgacha" class="px-2"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { moneyConfig, rules, phoneMask } from '@/modules/constants'
import { reactive, ref } from 'vue'
const { edit, date } = defineProps(['edit', 'date'])
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



function clearOverlay() {
	pageData.overlay = false
}

axios.all([axios.get('user-cars/get-only-my'), axios.get('region')])
	.then(axios.spread(({ data: cars }, { data: regions }) => {
		pageData.cars = cars
		pageData.regions = regions
	}))

defineExpose({ regionChanged, formData, clearOverlay })

// function addCity() {
// 	if (formData.ends.length == 4) return
// 	formData.ends.splice(1, 0, { region: null, city: null, loading: false, districts: [] });
// }
</script>