<template>
	<v-form ref="formTag" @submit.prevent="submitFunction" @vue:unmounted="pageData.loading = false">
		<v-card>
			<v-card-title>{{ title }}</v-card-title>
			<v-divider class="border-opacity-50"></v-divider>
			<v-card-text style="max-height: 700px;" class="pa-0 tw-relative">
				<v-container>
					<slot></slot>
				</v-container>
			</v-card-text>
			<v-divider class="border-opacity-50"></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" variant="text" @click="$emit('close')">
					Yopish
				</v-btn>
				<v-btn color="primary" type="submit" class="ml-4" variant="tonal" :loading="pageData.loading">
					{{ textButton }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const emit = defineEmits(['close'])
const { submit, textButton, title } = defineProps({
	submit: { type: Function, required: true, },
	title: { type: String, required: true },
	textButton: { type: String, default: 'Saqlash' },
})
const formTag = ref()

const pageData = reactive({
	dialog: false,
	loading: false,
})


async function submitFunction() {
	const { valid } = await formTag.value.validate()
	if (valid == false || pageData.loading) return
	pageData.loading = true


	submit().then(() => {
		pageData.loading = false
		emit('close')
	})
		.catch(() => pageData.loading = false)
}
</script>