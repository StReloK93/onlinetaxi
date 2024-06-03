<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn icon="mdi-plus" v-bind="props" size="x-small" variant="tonal"></v-btn>
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Taklif kiritish"
			@close="pageData.dialog = false">
			<FormInputs @vue:mounted="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInputs, IOffersPassenger, OfferPassengerRepository } from '..'
const emit = defineEmits(['create'])

const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})


async function submitFunction() {
	const formData: IOffersPassenger = inputComponent.value.formData
	await OfferPassengerRepository.create(formData)
}
</script>