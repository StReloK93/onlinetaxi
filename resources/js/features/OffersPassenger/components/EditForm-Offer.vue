<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn icon="mdi-pencil" v-bind="props" size="x-small" variant="plain"></v-btn>
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Taklif kiritish"
			@close="pageData.dialog = false">
			<FormInputs @on-ready="getOffer()" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { unformat } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import { FormInputs, IOffersPassenger, OfferPassengerRepository } from '..'
const emit = defineEmits(['create'])
const props = defineProps(['id'])
const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})


async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await OfferPassengerRepository.update(props.id, formData)
}

async function getOffer() {
	pageData.loading = true

	const offer = await OfferPassengerRepository.show(props.id)

	const formData = inputComponent.value.formData as IOffersPassenger
	formData.price = offer.price
	formData.user_car_id = offer.user_car.id
	formData.ride_time = offer.ride_time

	pageData.loading = false
}


</script>