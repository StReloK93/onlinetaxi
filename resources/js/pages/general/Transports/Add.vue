<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
        </template>
        <BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transport kiritish" @close="pageData.dialog = false">
            <Inputs @onStart="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" />
        </BaseForm>
    </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
const emit = defineEmits(['create'])
const inputComponent = ref()
const pageData = reactive({ dialog: false, overlay: false })

async function submitFunction() {
    const formData = inputComponent.value.formData

    await axios.post('user-car', formData).then(({ data }) => {
        emit('create', data)
        pageData.dialog = false
    })
}
</script>