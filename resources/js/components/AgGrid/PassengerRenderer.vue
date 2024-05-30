<template>
	<section class="passengerCard w-100 d-flex flex-column bg-white elevation-1 mb-2 position-relative">
		<main class="pa-2 tw-h-16 d-flex flex-column justify-space-between position-relative">
			<v-icon class="position-absolute tw-top-[38px] tw-left-[2px]" color="primary">mdi-chevron-down</v-icon>
			<div class="position-absolute h-50 cityLine">
			</div>
			<aside class="tw-leading-none d-flex align-center">
				<v-icon class="mr-2 text-caption" color="primary">
					mdi-circle-medium
				</v-icon>
				<span class="font-weight-bold">
					{{ props.passenger.start.name }}
				</span>
				<span class="text-caption ml-2 text-grey-lighten-1">
					{{ props.passenger.start.region.name.replace('viloyati', 'V.') }}
				</span>
			</aside>

			<aside class="tw-leading-none d-flex align-center">
				<v-icon class="mr-2 text-caption tw-opacity-0" color="primary">
					mdi-circle-medium
				</v-icon>
				<span class="font-weight-bold">
					{{ props.passenger.end.name }}
				</span>
				<span class="text-caption ml-2 text-grey-lighten-1">
					{{ props.passenger.end.region.name.replace('viloyati', 'V.') }}
				</span>
			</aside>
		</main>

		<main class="px-2 pb-1 pt-4 d-flex flex-column justify-space-between flex-grow-1">
			<section class="flex-grow-1">
				<div class="d-flex justify-space-between">
					<main class="d-flex flex-column align-end">
						<div class="text-right tw-leading-none">
							<span v-for="item in props.passenger.count">
								<v-icon size="small" color="primary">mdi-account</v-icon>
							</span>
						</div>
					</main>
				</div>
			</section>
			<section class="d-flex justify-space-between align-center">
				<div v-if="props.passenger.ride_time" class="tw-leading-none">
					<p class="text-grey-darken-1 tw-translate-y-1">
						{{ moment(props.passenger.ride_time).format('HH:mm') }}
					</p>
					<span class="text-uppercase tw-text-2xl font-weight-medium text-grey-darken-2 tw-inline-flex tw-items-center">
						{{ moment(props.passenger.ride_time).format('D-MMMM') }}
					</span>
				</div>
				<div class="d-flex align-end">
					<div :class="{ '-tw-translate-x-24': Auth.isAnyAdmins }" class="tw-leading-none"
						v-if="Auth.isAnyAdmins || Auth.user?.id == props.passenger.user_id">
						<v-btn v-if="Auth.isAnyAdmins" tag="a" :href="`tel:+998${props.passenger.phone}`" size="x-small"
							variant="plain" color="teal" icon="mdi-phone" />
						<Edit :id="props.passenger.id"></Edit>
						<!-- <v-btn size="x-small" @click="carRideDelete" variant="plain" icon="mdi-delete" /> -->
					</div>
					<v-chip v-if="Auth.isAnyAdmins" variant="tonal" color="primary"
						class="font-weight-medium position-absolute -tw-right-9 pr-10">
						{{ format(props.passenger.price, moneyConfig) }} so'm
					</v-chip>
				</div>
			</section>
		</main>
	</section>
</template>

<script setup lang="ts">
import Edit from '@/features/Passengers/Edit.vue'
import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { IPassenger } from '@/app/interfaces'
import { PropType } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()


const props = defineProps({
	passenger: {
		required: true,
		type: Object as PropType<IPassenger>
	}
})






</script>
<style scoped>
.passengerCard {
	height: 170px;
	border-left-color: rgb(var(--v-theme-primary));
	border-left-width: 2px;
	overflow: hidden;
}

.cityLine {
	border-left-width: 2px;
	border-left-style: dotted;
	top: 15px;
	left: 13px;
}
</style>