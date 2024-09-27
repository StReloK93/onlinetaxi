<template>
	<section class="car-ride-card w-100 d-flex flex-column bg-white elevation-1 mb-2 rounded-e">
		<aside @click="$emit('activate', props.ride?.id)" class="d-flex flex-column h-100" v-ripple>
			<main class="pa-2 d-flex flex-column justify-space-between position-relative">
				<v-icon class="position-absolute city-direction" color="secondary">mdi-chevron-down</v-icon>
				<div class="position-absolute city-line"></div>
				<aside class="leading-none d-flex align-center mb-2">
					<v-icon class="mr-1 text-caption" color="secondary">
						mdi-circle-medium
					</v-icon>
					<span class="font-weight-medium">
						{{ props.ride.start?.name }}
					</span>
					<span class="text-caption ml-1 text-grey-lighten-1">
						{{ props.ride.start?.region.name.replace('viloyati', 'V.') }}
					</span>
				</aside>
				<aside class="leading-none d-flex align-center">
					<v-icon class="mr-1 text-caption opacity-0" color="secondary">
						mdi-circle-medium
					</v-icon>
					<span class="font-weight-medium">
						{{ props.ride.end?.name }}
					</span>
					<span class="text-caption ml-1 text-grey-lighten-1">
						{{ props.ride.end?.region.name.replace('viloyati', 'V.') }}
					</span>
				</aside>
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
								<v-icon v-if="index < aviablePassengersCount" size="small" color="primary">mdi-account</v-icon>
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
						<span class="text-uppercase text-h6 font-weight-bold text-grey-darken-2 d-inline-flex items-center">
							{{ moment(props.ride.day).format('D-MMMM') }}
							<v-btn v-if="props.ride.strictly_on_time" icon="" size="x-small" variant="text">
								<v-icon>mdi-book-clock</v-icon>
								<v-tooltip activator="parent" :open-on-click="true" location="bottom">
									Qat'iy shu vaqtda
								</v-tooltip>
							</v-btn>
						</span>
					</div>
					<div class="d-flex align-center position-relative">
						<v-icon v-if="isMyAdd(props.ride)" class="position-absolute" style="top: -11px; right: -4px;"
							color="primary">mdi-circle-medium</v-icon>
						<v-chip variant="tonal" color="secondary" size="small" class="font-weight-medium rounded-e-0 pr-1 ">
							{{ format(props.ride.price, moneyConfig) }} so'm
						</v-chip>
					</div>
				</section>
			</main>
		</aside>
		<v-divider></v-divider>
		<v-expand-transition>
			<div v-if="props.activeCard == props.ride?.id" class="px-2 bg-grey-lighten-4">
				<div class="leading-none">
					<aside class="pt-2 mb-2 d-flex justify-space-between">
						<v-label class="text-caption">
							<v-icon color="pink" class="mr-1">mdi-calendar-clock</v-icon>
							{{ moment(ride.created_at).format('D-MMMM HH:mm') }}
						</v-label>
						<a :href="`tel:+998${ride.phone}`.replace(/\s/g, '')">
							<v-btn size="x-small" variant="plain" color="teal" icon="mdi-phone" />
						</a>
					</aside>
					<aside v-if="isMyAdd(ride)">
						<span>
							<EditForm :date="true" :id="ride.id" :submit="rideStore.update"></EditForm>
							<v-btn size="x-small" color="secondary" @click="carRideDelete(ride.id)" variant="plain"
								icon="mdi-delete" />
						</span>
					</aside>
				</div>
			</div>
		</v-expand-transition>
	</section>
</template>

<script setup lang="ts">
import EditForm from './EditForm-CarRide.vue'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { computed } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { useCarRide } from '../CarRideStore'
const props = defineProps(['ride', 'activeCard'])

const store = useMainStore()
const Auth = useAuthStore()
const rideStore = useCarRide()


function isMyAdd(ride) {
	return Auth.user?.id == ride?.user_id
}

const aviablePassengersCount = computed(() => props.ride.passengers.reduce((acc, pass) => acc += pass.count, 0))

function carRideDelete(ride_id) {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => rideStore.destroy(ride_id)
	})
}

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