<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" icon="mdi-plus" :class="parentProps.btnClass" class="add-button" />
		</template>
		<BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Qatnov kiritish" @close="pageData.dialog = false">
			<FormInputs @vue:mounted="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent"  />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { moneyConfig } from '@/modules/constants'
import { unformat } from 'v-money3'
import { FormInputs } from '..'


const parentProps = defineProps(['btnClass', 'submit'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: true })


async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await parentProps.submit(formData)
}
</script>