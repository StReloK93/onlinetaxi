<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">

		<template v-slot:activator="{ props }">
			<v-btn size="x-small" v-bind="props" variant="plain" icon="mdi-pencil" />
		</template>

		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchini tahrirlash"
			@close="pageData.dialog = false" @vue:mounted="getData(parentProps.id)">
			<FormInputs ref="inputComponent" />
		</BaseForm>

	</v-dialog>
</template>
<script setup lang="ts">
import { FormInputs, IPassenger, PassengerRepository } from '..'
import axios from '@/repository/Clients/AxiosClient'
import { reactive, ref } from 'vue'

const parentProps = defineProps(['id'])
const inputComponent = ref()

const emit = defineEmits(['update'])

const pageData = reactive({
	dialog: false,
	loading: false,
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	await PassengerRepository.update(parentProps.id, formData)
}




function getData(id) {
	pageData.loading = true
	axios.get<IPassenger>(`passenger/${id}`).then(async ({ data }) => {
		const formData: IPassenger = inputComponent.value.formData
		formData.phone = data.phone
		formData.address = data.address
		formData.start_region = data.start.region_id
		formData.end_region = data.end.region_id
		formData.price = data.price
		formData.count = data.count
		formData.ride_time = data.ride_time
		formData.with_trunk = Boolean(data.with_trunk)

		await inputComponent.value.regionChanged(formData.start_region, 'start')
			.then(() => formData.start_city = data.start_city)
		await inputComponent.value.regionChanged(formData.end_region, 'end')
			.then(() => formData.end_city = data.end_city)

		pageData.loading = false
	})
}
</script>