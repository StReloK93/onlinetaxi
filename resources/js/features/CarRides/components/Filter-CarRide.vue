<template>
	<div class="text-right w-100 px-1">
		<v-btn @click="bottomSheet = true" variant="text" append-icon="mdi-filter">Filterlash</v-btn>
	</div>
	<v-bottom-sheet v-model="bottomSheet" inset>
		<v-card class="bg-white pa-2" @vue:mounted="Mounted">
			<BaseSelectCity
				v-model="filters.start_city"
				:categories="pageData.regions"
				:subCategories="pageData.districts"
				startText="Qayerdan?"
				class="mb-1"
			/>
			<BaseSelectCity
				v-model="filters.end_city"
				:categories="pageData.regions"
				:subCategories="pageData.districts"
				startText="Qayerga?"
				class="mb-1"
			/>
			<BaseSelectTimeInput v-model:datetime="filters.day" :only-date="false"/>
		</v-card>
	</v-bottom-sheet>
</template>

<script setup lang="ts">
import BaseSelectCity from "@/components/BaseSelectCity.vue"
import BaseSelectTimeInput from "@/components/BaseSelectTimeInput.vue"
import { reactive, ref } from 'vue'
import AxiosClient from '@/modules/AxiosClient';
const bottomSheet = ref(false)

const pageData = reactive({
	regions: [],
	districts: [],
})



const filters = reactive({
	day: null,
	start_city: null,
	end_city: null,
	price: null,
	passengers_count: 1,
})


async function Mounted() {
	const { data: regions } = await AxiosClient.get("region");
   pageData.regions = regions;

   const { data: districts } = await AxiosClient.get("district");
   pageData.districts = districts;
}
</script>