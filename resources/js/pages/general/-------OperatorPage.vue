<template>
	<v-card class="d-flex flex-column">
		<v-tabs v-model="props.tab">
			<v-tab :to="{ name: 'operator', params: { id: region.id } }" :value="region.id"
				v-for="region in props.regions">
				<span class="tw-text-xs">
					{{ region.name.replace('viloyati', '') }}
				</span>
			</v-tab>
		</v-tabs>
		<v-spacer class="overflow-y-auto tw-relative">
			<main class="tw-absolute tw-inset-0">
				<!--  -->
				<Add :btnClass="['!tw-bottom-3 !tw-right-3']" />
				<CarRideModal ref="rideModal" />
				<!--  -->
				<v-expansion-panels v-model="props.panel" multiple variant="accordion">
					<v-expansion-panel v-for="(districts, name) in CarRide.groupRides" elevation="1">
						<v-expansion-panel-title>{{ name }}</v-expansion-panel-title>
						<v-expansion-panel-text class="operator">
							<v-row class="ma-0">
								<v-col cols="6" class="tw-border-r px-1">
									<h3 class="text-center">Qatnovlar</h3>
									<section class="d-flex flex-wrap">
										<aside v-for="(endpoint, key) in districts" class="px-1 tw-w-64 tw-border-l first:tw-border-none">
											<div>
												<header class="text-center text-pink tw-font-medium tw-text-xs tw-py-2 mb-2">
													<span>{{ name }}</span> - {{ replace(key, 'viloyati', 'V.') }}
												</header>
												<footer>
													<CarRideCard v-for="ride in endpoint" :ride="ride" @click="rideModal.openModal(ride.id)" />
												</footer>
											</div>
										</aside>
									</section>
								</v-col>
								<v-col cols="6">
									<h3 class="text-center">
										Transport biriktirilmagan yo'lovchilar
									</h3>
									<section>

									</section>
								</v-col>
							</v-row>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</main>
		</v-spacer>
	</v-card>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { replace } from '@/modules/constants'
import CarRideModal from '@/features/Operator/CarRideModal.vue'
import CarRideCard from '@/features/Operator/CarRideCard.vue'
import Add from '@/features/CarRides/Add.vue'
import { useCarRide } from '@/store/CarRide'
const CarRide = useCarRide()

const rideModal = ref()

const route = useRoute()
CarRide.getRidesByRegion(route.params.id)
const props = reactive({
	tab: 1,
	regions: null,
	panel: 0,
})



axios.get('region').then(({ data }) => props.regions = data)
watch(route, (current) => {
	CarRide.getRidesByRegion(current.params.id)
	props.panel = null
})
</script>