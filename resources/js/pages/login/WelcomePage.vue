<template>
	<v-app class="h-screen login-page">
		<v-container class="d-flex h-100 justify-center align-center">
			<v-card width="500">
				<div class="text-center py-4">
					<img src="/favicon.ico" width="100" class="d-inline">
				</div>
				<h3 class="text-h4 text-center">
					Xush kelibsiz
				</h3>
				<p class="text-caption text-center">
					Iltimos malumotlaringizni kiriting
				</p>
				<v-form @submit.prevent="submit">
					<v-card-text>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="formData.name" label="F.I.SH" variant="filled" :rules="rules" />
							</v-col>
							<v-col cols="12">
								<v-btn class="w-100" type="submit">
									<span>Dasturga kirish</span>
									<v-icon end>
										mdi-login
									</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-card-text>
				</v-form>
			</v-card>
		</v-container>
	</v-app>
</template>

<script setup lang="ts">
import { rules } from '@/modules/constants'
import { reactive } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const authStore = useAuthStore()
const formData = reactive({
	role: 4,
	name: null,
})

async function submit(event) {
	const form = await event.then()
	if (form.valid == false) return 



	authStore.setUserNameRole(formData)
}
</script>