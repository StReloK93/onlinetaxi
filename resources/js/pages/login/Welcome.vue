<template>
	<v-app class="tw-h-screen login-page">
		<v-container class="tw-flex tw-h-full tw-justify-center tw-items-center">
			<v-card width="500">
				<div class="text-center py-4">
					<img src="/iconos/map.svg" width="100" class="d-inline">
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
							<v-col cols="6" class="py-0 pr-1">
								<v-btn tag="label" :color="formData.role == 2 ? 'default' : 'primary'" for="passengerRadio"
									variant="tonal" class="w-100">
									<span>Yo'lovchi</span>
									<v-icon end>
										mdi-account
									</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="6" class="py-0 pl-1">
								<v-btn tag="label" :color="formData.role == 1 ? 'default' : 'primary'" for="TaxiRadio"
									variant="tonal" class="w-100">
									<span>Haydovchi</span>
									<v-icon end>
										mdi-taxi
									</v-icon>
								</v-btn>
							</v-col>
							<v-radio-group v-model="formData.role" hidden>
								<v-radio id="passengerRadio" label="Option One" :value="1"></v-radio>
								<v-radio id="TaxiRadio" label="Option 2 (string)" :value="2"></v-radio>
							</v-radio-group>

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
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const formData = reactive({
	role: 1,
	name: null,
})

async function submit(event) {
	const form = await event.then()
	
	if (form.valid) {
		authStore.sendUserData(formData)
	}

}
</script>