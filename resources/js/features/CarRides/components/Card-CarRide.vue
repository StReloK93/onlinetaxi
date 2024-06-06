<template>
	<section class="car-ride-card w-100 d-flex flex-column bg-white elevation-1 mb-2 rounded-e">
		<main class="pa-2 d-flex flex-column justify-space-between position-relative">
			<v-icon class="position-absolute city-direction" color="primary" >mdi-chevron-down</v-icon>
			<div
				class="position-absolute city-line">
			</div>
			<template v-for="(item, index) in props.ride.cities">
				<aside v-if="latest(index) || first(index)" :class="[ {'mb-2': first(index)}]" class="leading-none d-flex align-center">
					<v-icon class="mr-1 text-caption" :class="[{'opacity-0': latest(index)}]" color="primary">
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

		<main class="px-2 pt-1 d-flex flex-column justify-space-between flex-grow-1">
			<section>
				<div class="d-flex justify-space-between">
					<main>
						<div>
							<span class="text-h5 mr-2 leading-none">
								{{ props.ride.user_car.car.name }}
							</span>
							<br>
							<span class="text-grey-lighten-1 text-caption mt-n1 d-block">
								{{ props.ride.user_car.number }}
							</span>
						</div>
					</main>
					<main class="d-flex align-end">
						<span v-for="(n,index) in props.ride.free_seat">
							<v-icon v-if="index < aviablePassengersCount" size="small" color="primary">mdi-account</v-icon>
							<v-icon v-else size="small" color="grey-lighten-1">mdi-account</v-icon>
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
				<div class="d-flex align-end">
					<div  class="leading-none" v-if="Auth.isAnyAdmins || Auth.user?.id == props.ride.user_id">
						<v-btn size="x-small" v-if="props.ride.state == 1" @click="inactivate" variant="plain" icon="mdi-eye" />
						<v-btn size="x-small" v-if="props.ride.state == 2" @click="activate" variant="plain" icon="mdi-eye-off" />
						<EditForm :date="true" :id="props.ride.id"></EditForm>
						<v-btn size="x-small" @click="carRideDelete" variant="plain" icon="mdi-delete" />
					</div>
					<v-chip v-if="Auth.isAnyAdmins" variant="tonal" color="primary" class="font-weight-medium rounded-e-0 me-n2">
						{{ format(props.ride.price, moneyConfig) }} so'm
					</v-chip>
				</div>
			</section>
		</main>
	</section>
</template>

<script setup lang="ts">
import { EditForm, useCarRide } from '@/features/CarRides'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { computed } from 'vue'
const rideStore = useCarRide()

const props = defineProps(['ride'])

const store = useMainStore()
const Auth = useAuthStore()

const aviablePassengersCount = computed(() => props.ride.passengers.reduce((acc, pass) => acc += pass.count, 0))

const latest = index => props.ride.cities.length - 1 == index
const first = index => index == 0


function carRideDelete() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => rideStore.destroy(props.ride.id)
	})
}

function inactivate() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni yashirmoqchisiz?"
		store.dialog.subTitle = "Yashirilgan qatnov 3 soat ichida faollashtirilmasa butunlay o'chib ketadi"
		store.dialog.submit = () => rideStore.inactivate(props.ride.id)
	})
}

function activate() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni faollashtirmoqchimisiz?"
		store.dialog.subTitle = "Qatnov faol holatda 3 soat turadi va avtomatik tarzda yashiriladi. Yashirilgandan so'ng 3 soat ichida faollashtirmasangiz qatnov butunlay o'chadi"
		store.dialog.submit = () => rideStore.activate(props.ride.id)
	})
}
</script>
<style scoped>
.city-direction{
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
	height: 160px;
	border-left-style: solid;
	border-left-color: rgb(var(--v-theme-secondary))!important;
	border-left-width: 2px!important;
	overflow: hidden;
}
</style>