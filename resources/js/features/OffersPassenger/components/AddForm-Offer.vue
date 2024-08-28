<template>
	<v-dialog v-model="pageData.dialog" scrollable  width="600px">
		<template v-slot:activator="{ props }">
			<v-btn append-icon="mdi-message-badge" v-bind="props" class="my-2" block variant="tonal">Taklif qoldirish</v-btn>
		</template>
		<section>
			<main @vue:mounted="formMounted">
				<Transition name="list">
					<BaseForm v-if="pageData.issetCars" :loading="pageData.loading" :submit="submitFunction" title="Taklif kiritish"
						@close="pageData.dialog = false">
						<FormInputs @on-car-empty="pageData.issetCars = false" @on-ready="pageData.loading = false" ref="inputComponent" />
					</BaseForm>
					<v-card v-else>
						<v-card-title>
							<v-icon color="red">mdi-alert</v-icon>
							Transport kiritilmagan
						</v-card-title>
						<v-card-text>
							<p class="my-4 font-weight-medium">
								Iltimos taklif kiritishdan oldin transport kiriting!
							</p>
							<v-btn block variant="tonal" append-icon="mdi-chevron-right" @click="$router.push('/user-transports')">
								Transportlar sahifasiga o'tish
							</v-btn>
						</v-card-text>
					</v-card>
				</Transition>
			</main>
		</section>
	</v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { unformat } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import { FormInputs, OfferPassengerRepository } from '..'
const emit = defineEmits(['create'])

const inputComponent = ref()
const pageData = reactive({
	dialog: false,
	loading: false,
	issetCars: false,
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await OfferPassengerRepository.create(formData)
}

function formMounted(){
	pageData.loading = true
	pageData.issetCars = true
}
</script>