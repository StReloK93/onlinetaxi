<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<AddForm v-if="(Auth.isAnyAdmins || Auth.isDriver) && hideButton" :submit="rideStore.create" />
			<!-- <Filters ref="filterComponent" />
			<Sorting /> -->
		</main>
		<v-spacer class="position-relative">
			<main @scroll="onScroll"
				class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<CardCarRide v-for="ride in rideStore.activeRides" :ride="ride" :key="ride.id">

						<div class="leading-none" v-if="Auth.isAnyAdmins || Auth.user?.id == ride.user_id">
							<v-btn v-if="Auth.isAnyAdmins" tag="a" :href="`tel:+998${ride.phone}`" size="x-small" variant="plain"
								color="teal" icon="mdi-phone" />
							<v-btn size="x-small" color="secondary" v-if="ride.state == 1" @click="inactivate(ride.id)"
								variant="plain" icon="mdi-eye" />
							<v-btn size="x-small" color="secondary" v-if="ride.state == 2" @click="activate(ride.id)"
								variant="plain" icon="mdi-eye-off" />
							<EditForm :date="true" :id="ride.id" :submit="rideStore.update"></EditForm>
							<v-btn size="x-small" color="secondary" @click="carRideDelete(ride.id)" variant="plain"
								icon="mdi-delete" />
						</div>

					</CardCarRide>
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRide, CardCarRide, CarRideRepository, EditForm } from '@/features/CarRides'
import { watch, onMounted, onUnmounted, ref } from 'vue'
import { useMainStore } from '@/store/useMainStore'
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useMainStore()
const rideStore = useCarRide()
const hideButton = ref(true)

function onScroll(event) {
	// const element = event.target

	// if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
	// 	// Element scrolled to bottom
	// 	hideButton.value = false
	// 	setTimeout(() => {
	// 		hideButton.value = true
	// 	}, 3000);
	// }
}




function carRideDelete(ride_id) {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => rideStore.destroy(ride_id)
	})
}

function inactivate(ride_id) {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni yashirmoqchisiz?"
		store.dialog.subTitle = "Yashirilgan qatnov 3 soat ichida faollashtirilmasa butunlay o'chib ketadi"
		store.dialog.submit = () => rideStore.inactivate(ride_id)
	})
}

function activate(ride_id) {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni faollashtirmoqchimisiz?"
		store.dialog.subTitle = "Qatnov faol holatda 3 soat turadi va avtomatik tarzda yashiriladi. Yashirilgandan so'ng 3 soat ichida faollashtirmasangiz qatnov butunlay o'chadi"
		store.dialog.submit = () => rideStore.activate(ride_id)
	})
}



watch(() => route.meta.method, async (current: any) => {
	rideStore.rides = await CarRideRepository.getOnlyActive()
	rideStore.filters = route.meta.method
})
onMounted(async () => {
	rideStore.rides = await CarRideRepository.getOnlyActive()
	rideStore.filters = route.meta.method
})

onUnmounted(() => {
	rideStore.rides = null
})
</script>