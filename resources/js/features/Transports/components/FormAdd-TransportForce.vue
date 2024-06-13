<template>
	<v-dialog v-model="isTransportNotAviable" v-if="startLoader" scrollable width="600px">
		<BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transport kiritish">
			<FormInputs @vue:mounted="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { FormInputs, ITransport, useTransport, TransportRepository } from '@/features/Transports';
import { useAuthStore } from '@/store/useAuthStore'
import { computed } from 'vue'
const AuthStore = useAuthStore()
const inputComponent = ref()
const pageData = reactive({ overlay: false })
const transports = ref([])
const startLoader = ref(false)




const isTransportNotAviable = computed(() => {
	if (AuthStore.isDriverAdmins) return transports.value.length == 0
	else return false
})


const transportStore = useTransport()

async function submitFunction() {
	const formData = inputComponent.value.formData as ITransport
	const transport = await transportStore.create(formData)
	transports.value.push(transport)
}


onMounted(async () => {
	transports.value = await TransportRepository.onlyAuthUser()
	startLoader.value = true
})
</script>