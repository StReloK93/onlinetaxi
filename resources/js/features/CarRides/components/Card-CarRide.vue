<template>
	<section class="car-ride-card w-100 d-flex flex-column bg-white elevation-1 mb-2 rounded-e">
		<aside @click="$emit('activate', props.ride?.id)" class="d-flex flex-column h-100" v-ripple>
			<main class="pa-2 d-flex flex-column justify-space-between position-relative">
				<v-icon class="position-absolute city-direction" color="secondary">mdi-chevron-down</v-icon>
				<div class="position-absolute city-line">
				</div>
				<template v-for="(item, index) in props.ride.cities">
					<aside v-if="latest(index) || first(index)" :class="[{ 'mb-2': first(index) }]"
						class="leading-none d-flex align-center">
						<v-icon class="mr-1 text-caption" :class="[{ 'opacity-0': latest(index) }]" color="secondary">
							mdi-circle-medium
						</v-icon>
						<span class="font-weight-medium">
							{{ item.district.name }}
						</span>
						<span class="text-caption ml-1 text-grey-lighten-1">
							{{ item.district.region.name.replace('viloyati', 'V.') }}
						</span>
					</aside>
				</template>
			</main>

			<main class="pl-2 pt-1 d-flex flex-column justify-space-between flex-grow-1">
				<section>
					<div class="d-flex justify-space-between">
						<main>
							<div>
								<span class="text-h5 mr-2 leading-none">
									{{ props.ride.user_car?.car.name }}
								</span>
								<br>
								<span class="text-grey-lighten-1 text-caption mt-n1 d-block">
									{{ props.ride.user_car?.number }}
								</span>
							</div>
						</main>
						<main class="d-flex align-end">
							<span v-for="(n, index) in props.ride.free_seat">
								<v-icon v-if="index < aviablePassengersCount" size="small"
									color="primary">mdi-account</v-icon>
								<v-icon v-else size="small" color="secondary">mdi-account</v-icon>
							</span>
						</main>
					</div>
				</section>
				<section class="d-flex justify-space-between align-center">
					<div class="leading-none">
						<p class="text-grey-darken-1 mb-n2 text-caption">
							{{ moment(props.ride.day).format('HH:mm') }}
						</p>
						<span
							class="text-uppercase text-h6 font-weight-bold text-grey-darken-2 d-inline-flex items-center">
							{{ moment(props.ride.day).format('D-MMMM') }}
							<v-btn v-if="props.ride.strictly_on_time" icon="" size="x-small" variant="text">
								<v-icon>mdi-book-clock</v-icon>
								<v-tooltip activator="parent" :open-on-click="true" location="bottom">
									Qat'iy shu vaqtda
								</v-tooltip>
							</v-btn>
						</span>
					</div>
					<div class="d-flex align-center">
						<v-chip variant="tonal" color="secondary" size="small"
							class="font-weight-medium rounded-e-0 pr-1">
							{{ format(props.ride.price, moneyConfig) }} so'm
						</v-chip>
					</div>
				</section>
			</main>
		</aside>
		<v-divider></v-divider>
		<v-expand-transition>
			<div v-if="props.activeCard == props.ride?.id" class="px-2 bg-grey-lighten-4">
				<slot></slot>
			</div>
		</v-expand-transition>
	</section>
</template>

<script setup lang="ts">
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { computed } from 'vue'

const props = defineProps(['ride', 'activeCard'])
const aviablePassengersCount = computed(() => props.ride.passengers.reduce((acc, pass) => acc += pass.count, 0))
const latest = index => props.ride.cities.length - 1 == index
const first = index => index == 0
</script>
<style scoped>
.city-direction {
	top: 34px;
	left: 2px;
}

.city-line {
	height: 28px;
	border-left-width: 2px;
	border-left-style: dotted;
	border-color: #d4d4d4;
	top: 18px;
	left: 13px;
}

.car-ride-card {
	user-select: none;
	border-left-style: solid;
	border-left-width: 2px !important;
	border-left-color: rgb(var(--v-theme-secondary)) !important;
	overflow: hidden;
}

.car-ride-card:last-child {
	margin-bottom: 2px !important;
}

.car-ride-card:first-child {
	margin-top: 2px !important;
}
</style>