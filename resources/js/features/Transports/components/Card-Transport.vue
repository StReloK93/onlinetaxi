<template>
	<section class="px-2 w-100 d-flex flex-column">
		<aside class="d-flex justify-space-between flex-grow-1 pt-1">
			<main>
				<h3 class="tw-uppercase tw-text-3xl text-primary tw-leading-none">
					{{ selected.car.name }}
				</h3>
				<div class="tw-text-sm tw-text-gray-600 tw-leading-none">
					{{ selected.car.company.name }}
				</div>
			</main>

		</aside>
		<div class="d-flex justify-space-between  align-center">
			<h3 class="tw-text-base tw-font-semibold tw-text-gray-600">{{ selected.number }}</h3>
			<span>
				<EditForm :id="selected.id"></EditForm>
				<v-btn size="small" @click="deleteTransport" variant="plain" icon="mdi-delete" />
			</span>
		</div>
	</section>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/useMainStore'
import { EditForm, useTransport, ITransport } from '@/features/Transports'

const tranportStore = useTransport()
const props = defineProps(['transport'])
const selected = props.transport as ITransport
const store = useMainStore()

console.log(props.transport);


function deleteTransport() {
	store.dialog.open(() => {
		store.dialog.title = "Transportni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "Ushbu transportga tegishli barcha qatnovlar ham o'chib ketadi."
		store.dialog.submit = () => tranportStore.destroy(selected)
	})
}
</script>