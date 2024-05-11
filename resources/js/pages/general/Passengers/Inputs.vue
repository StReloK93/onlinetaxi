<template>
	<v-row>
		<v-col sm="6" cols="12">
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
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.name" :step="900" label="F.I.SH" :rules="rules" />
		</v-col>
		<v-col cols="12" class="py-0 text-center">
			<v-label class="text-caption">
				Boshlangich manzil (Qaerdan?)
			</v-label>
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete @update:model-value="(id) => regionChanged(id, 'start')" :items="pageData.regions"
				v-model="formData.start_region" label="Viloyat" item-title="name" :item-value="(item) => item.id"
				:rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-autocomplete :disabled="formData.start_region == null" :items="pageData.start_districts"
				v-model="formData.start_city" label="Shahar (Tuman)" item-title="name" :loading="pageData.start_loading"
				:item-value="(item) => item.id" :rules="rules" />
		</v-col>
		<v-divider class="border-opacity-75"></v-divider>
		<v-col cols="12" class="py-0 text-center">
			<v-label class="text-caption">
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
		<v-divider class="border-opacity-75"></v-divider>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.address" :step="900" label="Yo'lovchining manzili" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.count" label="Necha kishi" :rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.ride_time" type="datetime-local" :step="900" label="Qatnov vaqti"
				:rules="rules" />
		</v-col>
		<v-col sm="6" cols="12">
			<v-switch v-model="formData.with_trunk" label="Bagaj"></v-switch>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { IPassenger } from '@/app/interfaces'
import { rules , phoneMask} from '@/modules/constants'
import { reactive } from 'vue'

const formData: IPassenger = reactive({
	car_ride_id: null,
	name: null,
	loading: null,
	phone: null,
	address: null,
	start_region: null,
	start_city: null,
	end_region: null,
	end_city: null,
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

axios.get('region').then(({ data: regions }) => pageData.regions = regions)
defineExpose({ regionChanged, formData })
</script>