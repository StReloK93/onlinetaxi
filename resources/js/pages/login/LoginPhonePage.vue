<template>
	<v-form @submit.prevent="signin">
		<div class="text-center py-4 mb-2 -tw-m-3 tw-rounded tw-bg-yellow-200/40">
			<img src="/iconos/logo.png"  width="100" class="d-inline">
			<!-- <h3 class="tw-text-xl mt-2 tw-font-semibold tw-uppercase">Shaharlararo online taxi</h3> -->
		</div>
		<v-col class="pa-0">
			<v-label>
				Telefon raqamingizni kiriting
			</v-label>
		</v-col>
		<main class="d-flex w-100">
			<v-col cols="4" class="px-0 py-2">
				<v-text-field class="pr-2 flex-0-0" readonly variant="filled" density="compact" value="+998">
					<template v-slot:prepend-inner>
						<v-icon>
							<img src="/iconos/uz.png">
						</v-icon>
					</template>
				</v-text-field>
			</v-col>
			<v-col cols="8" class="px-0 py-2">
				<v-text-field v-maska:[options] variant="filled" inputmode="tel" density="compact" :rules="rules" />
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