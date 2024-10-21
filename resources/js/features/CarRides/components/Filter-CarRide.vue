<template>
	<div class="text-right w-100 px-1">
		<v-btn v-if="issetFilter" @click="clearFilter" variant="text" icon="mdi-close" density="compact"
			size="small" class="mr-2" />
		<v-btn @click="bottomSheet = true" variant="text" append-icon="mdi-filter">Mos yo'nalishdagilarni topish</v-btn>
	</div>
	<v-bottom-sheet v-model="bottomSheet" inset>
		<v-card class="bg-white" @vue:mounted="Mounted">
			<v-card-title>Filterlar</v-card-title>
			<v-card-text style="max-height: 700px;" class="pa-2 tw-relative">
				<BaseSelectCity v-model="filters.start_city" :categories="pageData.regions"
					:subCategories="pageData.districts" startText="Qayerdan?" class="mb-1" />
				<BaseSelectCity v-model="filters.end_city" :categories="pageData.regions"
					:subCategories="pageData.districts" startText="Qayerga?" class="mb-1" />
				<BaseSelectTimeInput v-model:datetime="filters.day" :only-date="false" />
				<v-btn class="mt-2" @click="onSubmitFilters" block>Filterni qo'llash</v-btn>
			</v-card-text>
		</v-card>
	</v-bottom-sheet>
</template>

<script setup lang="ts">
import BaseSelectCity from "@/components/BaseSelectCity.vue"
import BaseSelectTimeInput from "@/components/BaseSelectTimeInput.vue"
import { computed, reactive, ref } from 'vue'
import { useCarRide } from "../CarRideStore";
import AxiosClient from '@/modules/AxiosClient';
const bottomSheet = ref(false)
const carRideStore = useCarRide()


const pageData = reactive({
	regions: [],
	districts: [],
})

function onSubmitFilters() {
	carRideStore.filters.start_city = filters.start_city
	carRideStore.filters.end_city = filters.end_city
	carRideStore.filters.day = filters.day

	bottomSheet.value = false
}


const filters = reactive({
	day: null,
	start_city: null,
	end_city: null,
	passengers_count: null,
	onlyMy: false,
})

const issetFilter = computed(() => {
	const array = []
	for (const key in carRideStore.filters) {
		array.push(carRideStore.filters[key])
	}
	return !array.every((item) => [null, false].includes(item))
})


function clearFilter(){
	carRideStore.onClearFilter()
	for (const key in filters) {
		filters[key] = carRideStore.filters[key]
	}
}




async function Mounted() {
	const { data: regions } = await AxiosClient.get("region");
	pageData.regions = regions;

	const { data: districts } = await AxiosClient.get("district");
	pageData.districts = districts;

	for (const key in filters) {
		filters[key] = carRideStore.filters[key]
	}
}
</script>