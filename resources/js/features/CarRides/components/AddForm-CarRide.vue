<template>
	<v-dialog v-model="pageData.dialog" scrollable width="400px">
		<template v-slot:activator="{ props }">
			<v-btn color="primary" v-bind="props" class="mt-2 mb-n1" append-icon="mdi-taxi" block :class="parentProps.btnClass"  >
				Elon kiritish
			</v-btn>
		</template>
		<section>
			<main @vue:mounted="formMounted">
				<Transition name="list">
					<BaseForm v-if="pageData.issetCars" :loading="pageData.overlay" :submit="submitFunction" title="Qatnov kiritish" @close="pageData.dialog = false">
						<FormInputs @onReady="pageData.overlay = false" @on-car-empty="pageData.issetCars = false" ref="inputComponent"/>
					</BaseForm>
					<v-card v-else>
						<v-card-title>
							<v-icon color="red">mdi-alert</v-icon>
							Transport kiritilmagan
						</v-card-title>
						<v-card-text>
							<p class="my-4 font-weight-medium">
								Iltimos qatnov kiritishdan oldin transport kiriting
							</p>
							<v-btn block variant="tonal" append-icon="mdi-chevron-right" @click="$router.push('user-transports')">
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
import { moneyConfig } from '@/modules/constants'
import { unformat } from 'v-money3'
import { FormInputs } from '..'


const parentProps = defineProps(['btnClass', 'submit'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: true, issetCars: true, })


async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await parentProps.submit(formData)
}


function formMounted(){
	pageData.overlay = true
	pageData.issetCars = true
}
</script>