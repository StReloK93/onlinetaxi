<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus" class="add-button" />
        </template>
        <CustomForm :submit="submitFunction" title="Transport kiritish" @close="pageData.dialog = false">
            <v-overlay v-model="pageData.overlay" contained persistent class="align-center justify-center">
                <v-progress-circular color="primary" indeterminate :size="68"></v-progress-circular>
            </v-overlay>
            <Inputs @onStart="pageData.overlay = true" @onReady="pageData.overlay = false" ref="inputComponent" />
        </CustomForm>
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