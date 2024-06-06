<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchi kiritish" @close="pageData.dialog = false">
			<FormInputs @vue:onmounted="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInputs, IPassenger, usePassengerStore } from '..'

const passengerStore = usePassengerStore()
const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})


async function submitFunction() {
	const formData: IPassenger = inputComponent.value.formData
	await passengerStore.create(formData)
}
</script>