<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn v-if="propsParent.smButton" v-bind="props" prepend-icon="mdi-pencil" size="x-small" variant="tonal"
                color="white">
                O'zgaritirish
            </v-btn>
            <v-btn v-else size="small" v-bind="props" variant="plain" icon="mdi-pencil" />
        </template>
        <BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transportni tahrirlash" @vue:mounted="getTransport(propsParent.id)"
            @close="pageData.dialog = false">
            <Inputs ref="inputComponent" />
        </BaseForm>
    </v-dialog>
</template>
<script setup lang="ts">
import { useTransport } from '@/store/Transports'
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
const transport = useTransport()
const inputComponent = ref()
const propsParent = defineProps(['smButton', 'id'])
const emit = defineEmits(['update'])
const pageData = reactive({
    dialog: false,
    overlay: false,
})

async function submitFunction() {
    const formData = inputComponent.value.formData
    await axios.put(`user-car/${propsParent.id}`, formData)
        .then(({ data }) => transport.update(data))
}



function getTransport(id) {
    pageData.overlay = true
    axios.get(`user-car/${id}`).then(({ data }) => {
        const formData = inputComponent.value.formData
        formData.number = data.number
        formData.fuel_type = data.fuel_type
        formData.number_variant = data.number_variant
        formData.car_company_id = data.car.car_company_id
        
        formData.trunk = Boolean(data.trunk)
        
        inputComponent.value.carMarkChanged(formData.car_company_id).then(() => {
            formData.car_id = data.car_id
            pageData.overlay = false
        })
        
    })
}
</script>