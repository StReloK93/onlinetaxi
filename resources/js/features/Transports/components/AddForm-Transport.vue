<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
        </template>
        <BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transport kiritish" @close="pageData.dialog = false">
            <FormInputs 
                @vue:mounted="pageData.overlay = true" 
                @onReady="pageData.overlay = false" 
                ref="inputComponent"
            />
        </BaseForm>
    </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInputs, ITransport, TransportRepository } from '@/features/Transports';
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: false })

async function submitFunction() {
    const formData = inputComponent.value.formData as ITransport
    await TransportRepository.create(formData)

    pageData.dialog = false
}
</script>