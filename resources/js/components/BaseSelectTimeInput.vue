<template>
	<div class="w-100">
		<v-btn @click="pageData.dialog = true" color="#666" variant="tonal" :loading="props.loading" block>
			<span v-if="datetime" class="text-primary">
				{{ moment(datetime, 'YYYY-MM-DD').format('D-MMMM') }}
				<template v-if="props.onlyDate">
					{{ moment(datetime).format('HH:mm') }}
				</template>
			</span>
			<span v-else>
				Qatnov vaqti
			</span>
		</v-btn>
		<v-text-field class="hidden tw-relative -tw-top-2 ml-3" hidden v-model="datetime" :rules="rules" />
		<v-dialog v-model="pageData.dialog" width="400px">
			<v-card @vue:unmounted="unMountedCard">
				<v-card-title>
					<v-icon>mdi mdi-book-clock</v-icon>
					Qatnov vaqti
				</v-card-title>
				<v-card-text class="pa-0 position-relative" style="height: 270px;">
					<VDatePicker @update:modelValue="onChangeHandler" transparent borderless expanded
						v-model="pageData.date" color="pink" />
					<Transition name="slide-up">
						<BaseTimePicker v-if="pageData.selected" v-model="pageData.time" @back="pageData.selected = false"
							@success="onSuccessHandler(pageData.date)" class="position-absolute top-0 left-0 w-100 h-100 bg-white z-50" />
					</Transition>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { rules } from "@/modules/constants";
import moment from 'moment';
import { reactive } from 'vue'
import BaseTimePicker from './BaseTimePicker.vue';
const props = defineProps({
	loading: { default: false },
	onlyDate: { default: true }
})

const datetime = defineModel('datetime')

const pageData = reactive({
	dialog: false,
	selected: false,
	date: null,
	time: '12:00',
})

function onChangeHandler(event) {
	if (event != null && props.onlyDate == true) pageData.selected = true
	else if(event == null && props.onlyDate == false){
		datetime.value = null
	}
	else {
		onSuccessHandler(event)
	}
}

function onSuccessHandler(event) {
	const formatedDate = moment(event).format('YYYY-MM-DD')
	datetime.value = `${formatedDate} ${props.onlyDate == true ? pageData.time : ''}`.trim()
	pageData.dialog = false
}

function unMountedCard() {
	pageData.time = '12:00'
	pageData.selected = false
}
</script>