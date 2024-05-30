<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
		</template>
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchi kiritish" @close="pageData.dialog = false">
			<Inputs @on-start="pageData.loading = true" @on-ready="pageData.loading = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import axios from '@/repository/Clients/AxiosClient'
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
import { IPassenger } from '@/app/interfaces'
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, loading: false })
async function submitFunction() {
	const formData: IPassenger = inputComponent.value.formData

	await axios.post<IPassenger>('passenger', formData).then(({ data: passenger }) => {
		emit('create', passenger)
	})
}
</script>