<template>
	<div class="w-100">
		<v-btn @click="pageData.dialog = true" color="dark" variant="tonal" :loading="props.loading" block>
			<span v-if="model == null">
				{{ props.startText }}
			</span>
			<span v-else class="font-weight-bold">
				{{ selectedCity?.name }}
				<span class="text-caption">
					- {{ selectedRegion?.name }}
				</span>
			</span>
		</v-btn>
		<v-text-field class="hidden tw-relative -tw-top-2 ml-3" hidden v-model="model" :rules="rules"/>
		<v-dialog v-model="pageData.dialog" class="w-100 max-w-500" >
			<v-card @vue:unmounted="pageData.selectedRegion = null">
				<v-card-title>
					<div class="d-flex justify-space-between align-center">
						<span>
							<v-icon>mdi mdi-map-marker</v-icon>
							{{ props.startText }}
						</span>
						<span v-if="addressModel != null">
							<v-switch v-model="addressModel" label="Manzilgacha" />
						</span>
					</div>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="pa-0 position-relative" style="height: 450px;">
					<v-list density="comfortable" class="position-absolute top-0 left-0 w-100 h-100 pa-1">
						<v-list-item @click="pageData.selectedRegion = region" color="primary" :value="region" v-for="region in props.categories">
							<v-list-item-title v-text="region.name"></v-list-item-title>
							<template v-slot:append>
								<v-icon>
									mdi mdi-chevron-right
								</v-icon>
							</template>
						</v-list-item>
					</v-list>
					<Transition name="slide-up">
						<v-list v-if="pageData.selectedRegion" density="comfortable" class="position-absolute top-0 left-0 w-100 h-100 pa-1">
							<v-btn @click="pageData.selectedRegion = null" color="dark" variant="tonal" block prepend-icon="mdi-chevron-left">
								Orqaga
							</v-btn>
							<v-list-item @click="selectCity(district)" color="primary" :value="district" v-for="district in districts">
								<v-list-item-title v-text="district.name"></v-list-item-title>
							</v-list-item>
						</v-list>
					</Transition>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { moneyConfig, rules } from "@/modules/constants";
import { reactive, computed } from 'vue';
const props = defineProps(['startText', 'loading', 'categories', 'subCategories'])
const model = defineModel()
const addressModel = defineModel('address')
const pageData = reactive({
	dialog: false,
	selectedRegion: null,
})

function selectCity(district){
	model.value = district.id
	pageData.dialog = false
}

const districts = computed(() => {
	return props.subCategories?.filter((subCategoryItem) => pageData.selectedRegion?.id == subCategoryItem.region_id)
})

const selectedCity = computed(() => {
	return props.subCategories?.find((subCategoryItem) => model.value == subCategoryItem.id)
})


const selectedRegion = computed(() => {
	return props.categories?.find((category) => selectedCity.value?.region_id == category.id)
})
</script>