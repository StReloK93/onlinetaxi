<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn append-icon="mdi-message-badge" v-bind="props" class="my-2" block variant="tonal">Taklif qoldirish</v-btn>
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Taklif kiritish"
			@close="pageData.dialog = false">
			<FormInputs @vue:mounted="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { unformat } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import { FormInputs, OfferPassengerRepository } from '..'
const emit = defineEmits(['create'])

const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await OfferPassengerRepository.create(formData)
}
</script>