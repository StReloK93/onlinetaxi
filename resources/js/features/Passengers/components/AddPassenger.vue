<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchi kiritish" @close="pageData.dialog = false">
			<InputsPassenger @vue:onmounted="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputsPassenger from './InputsPassenger.vue'
import { IPassenger } from '@/app/interfaces'
import PassengerRepository from '@/features/Passengers/PassengerRepository'

const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false
})


async function submitFunction() {
	const formData: IPassenger = inputComponent.value.formData
	await PassengerRepository.create(formData)
}
</script>