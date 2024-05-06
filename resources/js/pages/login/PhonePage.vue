<template>
	<v-form @submit.prevent="signin">
		<div class="text-center pb-4">
			<img src="/iconos/map.svg"  width="100" class="d-inline">
		</div>
		<v-col class="py-0">
			<v-label class="mb-2">
				Telefon raqamingizni kiriting
			</v-label>
		</v-col>
		<main class="d-flex w-100">
			<v-col cols="auto" class="pr-0">
				<v-text-field class="pr-2 flex-0-0" readonly variant="filled" density="compact" value="+998">
					<template v-slot:prepend-inner>
						<v-icon>
							<img src="/iconos/uz.png">
						</v-icon>
					</template>
				</v-text-field>
			</v-col>
			<v-col cols="12" class="pl-0">
				<v-text-field v-maska:[options] variant="filled" density="compact" :rules="rules" />
			</v-col>
		</main>
		<div class="text-end mt-5">
			<v-btn type='submit' :loading="pageData.loading" :disabled="!pageData.success" variant="tonal" color="gray" append-icon="mdi-arrow-right">
				SMS junatish
			</v-btn>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { vMaska, MaskaDetail } from "maska"
import { useAuthStore } from '@/store/useAuthStore'
import { rules } from '@/modules/constants'
const authStore = useAuthStore()
const options = {
	mask: '## ### ## ##',
	onMaska: (detail: MaskaDetail) => {
		pageData.success = detail.completed
		pageData.phone = detail.unmasked
	}
}

const pageData = reactive({
	phone: '',
	success: false,
	loading: false,
})

async function signin() {
	pageData.loading = true
	await authStore.sendSecretCode({ phone: pageData.phone })
	pageData.loading = false

}
</script>