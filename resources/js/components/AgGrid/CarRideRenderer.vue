<template>
	<section class="tw-shadow w-100">
		<main class="pa-2 tw-h-14 d-flex flex-column justify-space-between">
			<aside v-for="(item, index) in carRide.cities" class="tw-leading-none">
				<v-icon class="mr-2 tw-text-xs" color="pink">
					mdi-circle-outline
				</v-icon>
				<span class="tw-text-xs">
					{{ item.district.region.name.replace('viloyati', '.V') }}
				</span>
				<span class="tw-text-bold">
					{{ item.district.name }}
				</span>
			</aside>
		</main>

		<main
			class="px-2 py-2 d-flex flex-column justify-space-between tw-flex-grow sm:tw-flex-grow-0">
			<section class="flex-grow-1">
				<div class="d-flex justify-space-between">
					<main class="tw-leading-none">
						<div class="tw-text-xl tw-leading-[3px]">
							{{ carRide.car.type }} <span class="text-grey-darken-1 tw-text-base">{{ carRide.car.number
								}}</span>
						</div>
						<div v-if="authStore.user.role == 3" class="py-1 tw-text-gray-500">
							<a :href="`tel:${carRide.phone}`">{{ carRide.phone }}</a>
						</div>
						<!-- <div class="py-1 text-primary">
							{{ carRide.car.fuel.name }}
						</div> -->
					</main>
					<main class="d-flex flex-column align-end">
						<div class="text-right tw-leading-none mb-2">
							<v-icon v-for="n in carRide.free_seat" color="pink">
								mdi-account-settings
							</v-icon>
						</div>

					</main>
				</div>
			</section>
			<section class="d-flex justify-space-between align-end">
				<div class="tw-leading-4">
					<p class="tw-text-gray-500">
						{{ moment(carRide.ride_time).format('HH:mm') }}
					</p>
					<span
						class="tw-uppercase tw-text-2xl tw-font-semibold tw-text-gray-600 tw-inline-flex tw-items-center">
						{{ moment(carRide.ride_time).format('D-MMMM') }}
						<v-btn v-if="carRide.strictly_on_time" icon="" size="x-small" variant="text">
							<v-icon>mdi-book-clock</v-icon>
							<v-tooltip activator="parent" location="bottom">Qat'iy shu vaqtda</v-tooltip>
						</v-btn>
					</span>
				</div>
				<v-chip size="large" variant="tonal" color="primary" class="tw-font-semibold tw-translate-x-10 pr-10">
					{{ format(carRide.price, moneyConfig) }} so'm
				</v-chip>
				<!-- <div v-if="authStore.user.role == 3 || authStore.user.id == carRide.user_id">
					<Edit :date="true" :id="carRide.id"></Edit>
					<v-btn size="small" @click="carDelete" variant="plain" icon="mdi-delete" class="ml-3" />
				</div> -->
			</section>
		</main>
	</section>
</template>

<script setup lang="ts">
import { Edit } from '@/pages/general/CarRides'
import { useMainStore, useAuthStore } from '@/store'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { computed } from 'vue'
import { ICarRide } from '@/app/interfaces'
import { useDisplay } from 'vuetify'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()
const { mobile } = useDisplay()
const props = defineProps(['params'])
const carRide = props.params.data as ICarRide

const store = useMainStore()
const authStore = useAuthStore()

const dotColor = (index) => {
	return [0, carRide.cities.length - 1].includes(index) ? 'pink-darken-2' : 'transparent'
}

const middleLocation = (index) => {
	return [0, carRide.cities.length - 1].includes(index) == true
}

function carDelete() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlar savatchada 1 oy muddat saqlanadi."
		store.dialog.submit = () => CarRide.destroy(carRide)
	})
}
</script>