<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" class="mt-2 mb-n1" append-icon="mdi-taxi" block   >
				Transport kiritish
			</v-btn>
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
import { FormInputs, ITransport, useTransport } from '@/features/Transports';
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: false })

const transportStore = useTransport()

async function submitFunction() {
    const formData = inputComponent.value.formData as ITransport
    await transportStore.create(formData)
    pageData.dialog = false
}
</script>