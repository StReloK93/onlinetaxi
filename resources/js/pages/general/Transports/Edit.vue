<template>
    <v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
        <template v-slot:activator="{ props }">
            <v-btn v-if="propsParent.smButton" v-bind="props" prepend-icon="mdi-pencil" size="x-small" variant="tonal"
                color="white">
                O'zgaritirish
            </v-btn>
            <v-btn v-else size="small" v-bind="props" variant="plain" icon="mdi-pencil" />
        </template>
        <CustomForm :submit="submitFunction" title="Transportni tahrirlash" @vue:mounted="getTransport(propsParent.id)"
            @close="pageData.dialog = false">
            <Inputs ref="inputComponent" />
        </CustomForm>
    </v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
import { useTransport } from '@/pages/general/Transports'
const transport = useTransport()
const inputComponent = ref()
const propsParent = defineProps(['smButton', 'id'])
const emit = defineEmits(['update'])
const pageData = reactive({
    dialog: false,
})

async function submitFunction() {
    const formData = inputComponent.value.formData
    await axios.put(`car/${propsParent.id}`, formData)
        .then(({ data }) => transport.update(data))
}



function getTransport(id) {
    axios.get(`car/${id}`).then(({ data }) => {
        const formData = inputComponent.value.formData
        formData.user_id = data.user_id
        formData.type = data.type
        formData.number = data.number
        formData.color = data.color
        formData.fuel_type = data.fuel_type
        formData.trunk = Boolean(data.trunk)
    })
}
</script>