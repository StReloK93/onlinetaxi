<template>
	<section class="transport-card px-2 w-100 d-flex flex-column bg-white elevation-1 rounded-e mb-2">
		<aside class="d-flex justify-space-between flex-grow-1 pt-1">
			<main>
				<h3 class="text-uppercase text-h5 text-primary leading-none">
					{{ props.transport.car.name }}
				</h3>
				<div class="text-caption text-grey-darken-1 leading-none">
					{{ props.transport.car.company.name }}
				</div>
			</main>
			<main>
				<span>
					{{ props.transport.fuel.name }}
				</span>
				<v-icon color="primary">mdi-water-opacity</v-icon>
			</main>
		</aside>
		<div class="d-flex justify-space-between align-center">
			<h3 class="font-weight-medium text-grey-darken-1">{{ props.transport.number }}</h3>
			<span>
				<EditForm :id="props.transport.id"></EditForm>
				<v-btn size="small" @click="deleteTransport" variant="plain" icon="mdi-delete" />
			</span>
		</div>
	</section>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/useMainStore'
import { EditForm, ITransport, useTransport } from '@/features/Transports'
import { PropType } from 'vue'
const transportStore = useTransport()
const props = defineProps({
	transport: {
		required: true,
		type: Object as PropType<ITransport>
	}
})

const store = useMainStore()

function deleteTransport() {
	store.dialog.open(() => {
		store.dialog.title = "Transportni o'chirmoqchimisiz ?"
		store.dialog.subTitle = "Ushbu transportga tegishli barcha qatnovlar ham o'chib ketadi."
		store.dialog.submit = () => transportStore.destroy(props.transport.id)
	})
}
</script>

<style scoped>
.transport-card {
	height: 90px;
	border-left-style: solid;
	border-left-color: rgb(var(--v-theme-primary)) !important;
	border-left-width: 2px !important;
	overflow: hidden;
}

.transport-card:last-child{
	margin-bottom: 2px!important;
}
.transport-card:first-child{
	margin-top: 2px!important;
}
</style>