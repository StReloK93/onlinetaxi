<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" :class="parentProps.btnClass" class="add-button" />
		</template>
		<BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Qatnov kiritish" @close="pageData.dialog = false">
			<Inputs @onStart="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" :date="parentProps.date" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import Inputs from './Inputs.vue'
import { reactive, ref } from 'vue'
import { moneyConfig } from '@/modules/constants'
import { unformat } from 'v-money3'
import { useCarRide } from '@/store/CarRide'
const CarRide = useCarRide()

const parentProps = defineProps(['date', 'btnClass'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: true })


async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	CarRide.store(formData)
}
</script>