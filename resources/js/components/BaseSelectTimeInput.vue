<template>
	<div class="w-100">
		<v-btn @click="pageData.dialog = true" color="dark" variant="tonal" :loading="props.loading" block>
			<span v-if="datetime">
				{{ moment(datetime).format('D-MMMM') }} {{ moment(datetime).format('HH:mm') }}
			</span>
			<span v-else>
				Qatnov vaqti
			</span>
		</v-btn>
		<v-text-field class="hidden tw-relative -tw-top-2 ml-3" hidden v-model="datetime" :rules="rules"/>
		<v-dialog v-model="pageData.dialog" width="400px">
			<v-card @vue:unmounted="unMountedCard">
				<v-card-title>
					<v-icon>mdi mdi-book-clock</v-icon>
					Qatnov vaqti
				</v-card-title>
				<v-card-text class="pa-0 position-relative" style="height: 270px;">
					<VDatePicker @update:modelValue="onChangeHandler" :min-date="new Date()" transparent borderless expanded v-model="pageData.date"
						color="pink" is-required />
					<Transition name="slide-up">
						<BaseTimePicker v-if="pageData.selected" v-model="pageData.time" @back="pageData.selected = false"
							@success="onSuccessHandler" class="position-absolute top-0 left-0 w-100 h-100 bg-white z-50" />
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
const props = defineProps(['loading'])

const datetime = defineModel('datetime')

const pageData = reactive({
	dialog: false,
	selected: false,
	date: null,
	time: null,
})

function onChangeHandler(event) {
	if (event != null) pageData.selected = true
}

function onSuccessHandler() {
	const formatedDate = moment(pageData.date).format('YYYY-MM-DD')
	datetime.value = `${formatedDate} ${pageData.time}`
	pageData.dialog = false
}

function unMountedCard(){
	pageData.selected = false
}
</script>