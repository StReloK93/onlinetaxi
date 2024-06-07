<template>
	<v-row>
		<v-col sm="6" cols="12">
			<VDatePicker :attributes='attrs' :trim-weeks="true" color="pink" :min-date="new Date()" v-model.string="formData.ride_time"
				:masks="{ modelValue: 'YYYY-MM-DD HH:mm' }" mode="datetime" is24hr transparent borderless expanded
				hide-time-header is-required />
		</v-col>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.price" label="Yo'lkira narxi" type="number" :rules="rules" class="mb-4" />
			<v-autocomplete :items="transports" v-model="formData.user_car_id" label="Transport"
				:item-title="(item: any) => `${item.car?.name} ( ${item.number} )`" :item-value="(item: any) => item.id"
				:rules="rules" />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { rules } from '@/modules/constants'
import { useRoute } from 'vue-router'
import TransportRepository from '@/features/Transports/TransportRepository'
import { reactive, ref, onMounted } from 'vue'
const emit = defineEmits(['onReady'])


const attrs = ref([
	{
		key: 'today',
		dot: true,
		dates: new Date(),
	},
]);


const $route = useRoute()
const transports = ref([])

const formData = reactive({
	passenger_id: $route.params.id,
	ride_time: null,
	price: null,
	user_car_id: null
})



defineExpose({ formData })

onMounted(async () => {
	transports.value = await TransportRepository.onlyAuthUser()

	emit('onReady')
})
</script>