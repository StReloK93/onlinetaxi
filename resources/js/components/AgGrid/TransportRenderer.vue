<template>
    <section class="px-2 w-100">
        <div>
            <aside class="d-flex justify-space-between">
                <main>
                    <h3 class="tw-uppercase tw-text-2xl">
                        {{ selected.car.name }}
                    </h3>
                    <div class="tw-text-sm">
                    </div>
                </main>
                <h3 class="text-primary tw-text-base">{{ selected.number }}</h3>
            </aside>
            <div class="d-flex justify-end">
                <Edit :id="selected.id"></Edit>
                <v-btn size="small" @click="deleteTransport" variant="plain" icon="mdi-delete" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ITransport } from '@/app/interfaces'
import { useMainStore } from '@/store'
import Edit from '@/pages/general/Transports/Edit.vue'
import { useTransport } from '@/repository/Transports'

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