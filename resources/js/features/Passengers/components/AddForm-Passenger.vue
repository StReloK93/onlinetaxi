<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="400px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" class="mt-2" append-icon="mdi-hail">
				Elon kiritish
			</v-btn>
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchi kiritish" @close="pageData.dialog = false">
			<FormInputs @vue:onmounted="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInputs, IPassenger, usePassengerStore } from '..'
import { moneyConfig } from '@/modules/constants'
import { unformat } from 'v-money3'

const passengerStore = usePassengerStore()
const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})


async function submitFunction() {
	const formData: IPassenger = inputComponent.value.formData
	formData.price = unformat(formData.price as any, moneyConfig)
	await passengerStore.create(formData)
}
</script>