<template>
	<v-row>
		<BaseSelectTimeInput v-model:datetime="formData.ride_time"/>
		<v-col sm="6" cols="12">
			<v-text-field v-model="formData.price" inputmode="numeric" label="Yo'lkira narxi" :rules="rules" class="mb-4" />
			<input v-money3="moneyConfig" v-model.lazy="formData.price" type="text" hidden/>
			<v-autocomplete
				:items="transports"
				v-model="formData.user_car_id"
				label="Transport"
				:item-title="(item: any) => `${item.car?.name} ( ${item.number} )`"
				:item-value="(item: any) => item.id"
				:rules="rules"
				v-if="transports.length > 1"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { rules, moneyConfig } from '@/modules/constants'
import { useRoute } from 'vue-router'
import BaseSelectTimeInput from '@/components/BaseSelectTimeInput.vue';
import UserRepository from '@/features/AuthUser/UserRepository';
import { reactive, ref, onMounted } from 'vue'
const emit = defineEmits(['onReady', 'onCarEmpty'])


const $route = useRoute()
const transports = ref([])

const formData = reactive({
	passenger_id: $route.params.id,
	ride_time: null,
	price: null,
	user_car_id: null,
})



defineExpose({ formData })

onMounted(async () => {
	transports.value = await UserRepository.cars()
	if(transports.value.length == 0) {
      emit('onCarEmpty')
      return emit("onReady");
   }

	formData.user_car_id = transports.value.length == 1 ? transports.value[0].id : null
	emit('onReady')
})
</script>