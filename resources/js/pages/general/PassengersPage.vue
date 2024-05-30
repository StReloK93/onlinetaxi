<template>
	<main class="d-flex tw-flex-col">
		<Add v-if="Auth.isAnyAdmins || Auth.isPassenger" @create="onCreate"></Add>
		<v-spacer class="overflow-hidden">
			<main class="position-absolute tw-inset-0 overflow-x-auto pr-1">
				<PassengerRenderer v-for="passenger in pageData.passengers" :passenger="passenger" />
			</main>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { PassengerRepository } from '@/repository'
import Add from '@/features/Passengers/Add.vue'

import PassengerRenderer from "@/components/AgGrid/PassengerRenderer.vue";
import { IPassenger } from '@/app/interfaces'
import { reactive, onMounted } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
interface PageData {
	passengers: IPassenger[],
}
const pageData: PageData = reactive({
	passengers: null,
})

function onCreate(Transport) {
	pageData.passengers.push(Transport)
}


function onEdit(Transport) {

}


onMounted(async () => {
	pageData.passengers = await PassengerRepository.index()
})
</script>