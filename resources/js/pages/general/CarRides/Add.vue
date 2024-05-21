<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" :class="parentProps.btnClass" class="add-button" />
		</template>
		<CustomForm :submit="submitFunction" title="Qatnov kiritish" @close="pageData.dialog = false">
			<v-overlay v-model="pageData.overlay" contained persistent class="align-center justify-center">
				<v-progress-circular color="primary" indeterminate :size="68"></v-progress-circular>
			</v-overlay>
			<Inputs @onStart="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" :date="parentProps.date" />
		</CustomForm>
	</v-dialog>
</template>

<script setup lang="ts">
import Inputs from './Inputs.vue'
import { reactive, ref } from 'vue'
import { moneyConfig } from '@/modules/constants'
import { unformat } from 'v-money3'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()

const parentProps = defineProps(['date', 'btnClass'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: true })


async function submitFunction() {
	const formData = inputComponent.value.formData

	formData.price = unformat(formData.price, moneyConfig)
	await axios.post('car-ride', formData)
		.then(({ data }) => CarRide.create(data))
}
</script>