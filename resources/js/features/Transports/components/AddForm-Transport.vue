<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
        </template>
        <BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transport kiritish" @close="pageData.dialog = false">
            <FormInputs @onStart="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" />
        </BaseForm>
    </v-dialog>
</template>

<script setup lang="ts">
import AxiosClient from '@/repository/Clients/AxiosClient'
import { reactive, ref } from 'vue'
import { FormInputs, ITransport } from '@/features/Transports';
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: false })

async function submitFunction() {
    const formData = inputComponent.value.formData

    await AxiosClient.post<ITransport>('user-car', formData).then(({ data }) => {
        emit('create', data)
        pageData.dialog = false
    })
}
</script>