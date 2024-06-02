<template>
	<section class="passenger-card w-100 d-flex flex-column bg-white elevation-1 mb-2 position-relative rounded-e">
		<main class="pa-2 d-flex flex-column justify-space-between position-relative">
			<v-icon class="city-direction position-absolute" color="primary">mdi-chevron-down</v-icon>
			<div class="position-absolute city-line"></div>
			<aside class="leading-none d-flex align-center mb-2">
				<v-icon class="mr-1 text-caption point-top" color="primary">
					mdi-circle-medium
				</v-icon>
				<span class="font-weight-medium">
					{{ props.passenger.start.name }}
				</span>
				<span class="text-caption ml-1 text-grey-lighten-1">
					{{ props.passenger.start.region.name.replace('viloyati', 'V.') }}
				</span>
			</aside>

			<aside class="leading-none d-flex align-center">
				<v-icon class="mr-1 text-caption opacity-0" color="primary">
					mdi-circle-medium
				</v-icon>
				<span class="font-weight-medium">
					{{ props.passenger.end.name }}
				</span>
				<span class="text-caption ml-1 text-grey-lighten-1">
					{{ props.passenger.end.region.name.replace('viloyati', 'V.') }}
				</span>
			</aside>
		</main>

		<main class="px-2 pt-3 d-flex flex-column justify-space-between flex-grow-1">
			<section>
				<div class="d-flex justify-space-between">
					<main></main>
					<main class="d-flex flex-column align-end">
						<div class="text-right leading-none">
							<span v-for="item in props.passenger.count">
								<v-icon size="small" color="primary">mdi-account</v-icon>
							</span>
						</div>
					</main>
				</div>
			</section>
			<section class="d-flex justify-space-between align-center">
				<div v-if="props.passenger.ride_time" class="leading-none">
					<p class="text-grey-darken-1 mb-n2 text-caption">
						{{ moment(props.passenger.ride_time).format('HH:mm') }}
					</p>
					<span class="text-uppercase text-h6 font-weight-bold text-grey-darken-3">
						{{ moment(props.passenger.ride_time).format('D-MMMM') }}
					</span>
				</div>
				<div v-else style="height: 44px;"></div>
				<div class="d-flex">
					<div class="leading-none"
						v-if="Auth.isAnyAdmins || Auth.user?.id == props.passenger.user_id">
						<v-btn v-if="Auth.isAnyAdmins" tag="a" :href="`tel:+998${props.passenger.phone}`" size="x-small"
							variant="plain" color="teal" icon="mdi-phone" />
						<EditForm :id="props.passenger.id"></EditForm>
						<v-btn size="x-small" @click="passengerDelete" variant="plain" icon="mdi-delete" />
					</div>
					<v-chip v-if="Auth.isAnyAdmins" variant="tonal" color="primary"
						class="font-weight-medium rounded-e-0 me-n2">
						{{ format(props.passenger.price, moneyConfig) }} so'm
					</v-chip>
				</div>
			</section>
		</main>
	</section>
</template>

<script setup lang="ts">
import { PassengerRepository, EditForm, IPassenger } from '@/features/Passengers';

import { format } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import moment from '@/modules/moment'
import { PropType } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const Auth = useAuthStore()
const store = useMainStore()

const props = defineProps({
	passenger: {
		required: true,
		type: Object as PropType<IPassenger>
	}
})


function passengerDelete() {
	store.dialog.open(() => {
		store.dialog.title = "Qatnovni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q"
		store.dialog.submit = () => PassengerRepository.destroy(props.passenger.id)
	})
}
</script>
<style scoped>
.passenger-card {
	height: 140px;
	border-left-style: solid;
	border-left-color: rgb(var(--v-theme-primary))!important;
	border-left-width: 2px!important;
	overflow: hidden;
}

.city-line {
	height: 28px;
	border-left-width: 2px;
	border-left-style: dotted;
	border-color: #d4d4d4;
	top: 18px;
	left: 13px;
}

.city-direction{
	top: 34px;
	left: 2px;
}

.point-top{
	position: relative;
}
</style>