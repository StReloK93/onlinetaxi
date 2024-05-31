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
				<Edit :id="selected.id"></Edit>
				<v-btn size="small" @click="deleteTransport" variant="plain" icon="mdi-delete" />
			</span>
		</div>
	</section>
</template>
<script setup lang="ts">
import { ITransport } from '@/app/interfaces'
import { useMainStore } from '@/store/useMainStore'
import Edit from '@/features/Transports/components/Edit.vue'
import { useTransport } from '@/store/Transports'

const tranportStore = useTransport()
const props = defineProps(['params'])
const selected = props.params.data as ITransport
const store = useMainStore()



function deleteTransport() {
	store.dialog.open(() => {
		store.dialog.title = "Transportni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "Ushbu transportga tegishli barcha qatnovlar ham o'chib ketadi."
		store.dialog.submit = () => tranportStore.destroy(selected)
	})
}
</script>