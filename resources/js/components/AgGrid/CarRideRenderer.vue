<template>
	<section class="w-100 d-flex flex-column">
		<main class="pa-2 tw-h-16 d-flex flex-column justify-space-between tw-relative">
			<v-icon class="tw-absolute tw-top-[38px] tw-left-[3.5px]" color="primary" >mdi-chevron-down</v-icon>
			<div
				class="tw-absolute tw-h-2/4 tw-border-l-2 border-primary tw-border-dotted tw-top-[15px] tw-left-[13px]">
			</div>
			<template v-for="(item, index) in carRide.cities">
				<aside v-if="firstOrLast(index)" class="tw-leading-none d-flex align-center">
					<v-icon class="mr-2 tw-text-xs" :class="{'tw-opacity-0': index == carRide.cities.length - 1 }" color="primary">
						mdi-circle-medium
					</v-icon>
					<span class="tw-font-bold">
						{{ item.district.name }}
					</span>
					<span class="tw-text-xs ml-2 tw-text-gray-400">
						{{ item.district.region.name.replace('viloyati', 'V.') }}
					</span>
				</aside>
			</template>
		</main>

		<main class="px-2 pb-1 pt-4 d-flex flex-column justify-space-between tw-flex-grow">
			<section class="flex-grow-1">
				<div class="d-flex justify-space-between">
					<main class="tw-leading-none">
						<div class="tw-text-xl tw-leading-[3px]">
							{{ carRide.user_car.car.name }}
							<span class="text-grey-darken-1 tw-text-base">
								{{ carRide.user_car.number }}
							</span>
						</div>
						<div v-if="Auth.isPassenger" class="tw-text-gray-500">
							<a :href="`tel:${carRide.phone}`">{{ carRide.phone }}</a>
						</div>
					</main>
					<main class="d-flex flex-column align-end">
						<div class="text-right tw-leading-none">
							<v-icon v-for="n in carRide.free_seat" color="primary">
								mdi-account-settings
							</v-icon>
						</div>
					</main>
				</div>
			</section>
			<section class="d-flex justify-space-between align-center">
				<div class="tw-leading-none">
					<p class="tw-text-gray-500 tw-translate-y-1">
						{{ moment(carRide.day).format('HH:mm') }}
					</p>
					<span
						class="tw-uppercase tw-text-2xl tw-font-semibold tw-text-gray-600 tw-inline-flex tw-items-center">
						{{ moment(carRide.day).format('D-MMMM') }}
						<v-btn v-if="carRide.strictly_on_time" icon="" size="x-small" variant="text">
							<v-icon>mdi-book-clock</v-icon>
							<v-tooltip activator="parent" :open-on-click="true" location="bottom">
								Qat'iy shu vaqtda
							</v-tooltip>
						</v-btn>
					</span>
				</div>
				<div class="d-flex align-end">
					<div :class="{'-tw-translate-x-24': Auth.isAnyAdmins}"
						class="tw-leading-none"
						v-if="Auth.isAnyAdmins || Auth.user?.id == carRide.user_id"
						>
						<v-btn v-if="Auth.isAnyAdmins" tag="a" :href="`tel:+998${carRide.phone}`" size="x-small" variant="plain" color="teal" icon="mdi-phone"></v-btn>
						<Edit :date="true" :id="carRide.id"></Edit>
						<v-btn size="x-small" @click="carRideDelete" variant="plain" icon="mdi-delete" />
					</div>
					<v-chip v-if="Auth.isAnyAdmins" variant="tonal" color="primary" class="tw-font-semibold tw-absolute -tw-right-9 pr-10">
						{{ format(carRide.price, moneyConfig) }} so'm
					</v-chip>
				</div>
			</section>
		</main>
	</section>
</template>

<script setup lang="ts">
import { Edit } from '@/pages/general/CarRides'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { ICarRide } from '@/app/interfaces'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()
const props = defineProps(['params'])
const carRide = props.params.data as ICarRide

const store = useMainStore()
const Auth = useAuthStore()

const firstOrLast = (index) => {
	return [0, carRide.cities.length - 1].includes(index) == true
}

function carRideDelete() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => CarRide.destroy(carRide)
	})
}
</script>