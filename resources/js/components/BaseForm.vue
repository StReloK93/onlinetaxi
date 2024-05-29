<template>
	<v-form ref="formTag" @submit.prevent="submitFunction" @vue:unmounted="pageData.loading = false">
		<v-card>
			<v-card-title>{{ props.title }}</v-card-title>
			<v-divider class="border-opacity-50"></v-divider>
			<v-card-text style="max-height: 700px;" class="pa-4 tw-relative">
				<v-overlay v-model="props.loading" contained persistent class="align-center justify-center">
					<v-progress-circular color="primary" indeterminate :size="68"></v-progress-circular>
				</v-overlay>
				<slot></slot>
			</v-card-text>
			<v-divider class="border-opacity-50"></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" variant="text" @click="$emit('close')">
					Yopish
				</v-btn>
				<v-btn color="primary" type="submit" class="ml-4" variant="tonal" :loading="pageData.loading">
					{{ props.textButton }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
	submit: { type: Function, required: true, },
	title: { type: String, required: true },
	textButton: { type: String, default: 'Saqlash' },
	loading: { type: Boolean },
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


	props.submit().then(() => {
		pageData.loading = false
		emit('close')
	})
		.catch(() => pageData.loading = false)
}
</script>