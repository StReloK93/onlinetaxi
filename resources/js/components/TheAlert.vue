<template>
	<v-dialog width="400" v-model="store.dialog.model">
		<v-form @submit.prevent="cancel()" @vue:mounted="onFocus" @vue:unmounted="store.dialog.reset">
			<v-card>
				<main class="px-5 py-3 text-center elevation-1 position-relative">
					<div class="mb-1">
						<v-icon color="primary" size="40">{{ store.dialog.icon }}</v-icon>
					</div>
					<span class="text-pink">
						{{ store.dialog.title }}
					</span>
				</main>
				<v-card-text class="bg-grey-lighten-4">
					{{ store.dialog.subTitle }}
				</v-card-text>

				<v-card-actions class="bg-grey-lighten-4">
					<v-spacer></v-spacer>
					<!-- focus:tw-outline-2 focus:tw-outline-red-300 focus:tw-outline -->
					<v-btn text="Yoq" ref="btnCalcel" color="primary" variant="tonal" type="submit"
						class=""
						@click="store.dialog.model = false">
					</v-btn>
					<v-btn text="Ha" type="button" color="gray" variant="tonal" @click="submit"></v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/useMainStore'
import { ref } from 'vue'

const btnCalcel = ref(null)
const store = useMainStore()


function cancel() {
	store.dialog.cancel()
}

function submit() {
	store.dialog.submitInner()
}

function onFocus() {
	setTimeout(() => btnCalcel.value.$el.focus())
}
</script>