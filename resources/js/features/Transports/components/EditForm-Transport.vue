<template>
    <v-dialog v-model="pageData.dialog" scrollable width="600px">
        <template v-slot:activator="{ props }">
            <v-btn v-if="propsParent.smButton" v-bind="props" prepend-icon="mdi-pencil" size="x-small" variant="tonal"
                color="white">
                O'zgaritirish
            </v-btn>
            <v-btn v-else size="small" v-bind="props" variant="plain" icon="mdi-pencil" />
        </template>
        <BaseForm :loading="pageData.overlay" :submit="submitFunction" title="Transportni tahrirlash"
            @vue:mounted="getTransport(propsParent.id)" @close="pageData.dialog = false">
            <FormInputs ref="inputComponent" />
        </BaseForm>
    </v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInputs, TransportRepository } from '@/features/Transports'

const inputComponent = ref()
const propsParent = defineProps(['smButton', 'id'])
const emit = defineEmits(['update'])
const pageData = reactive({
    dialog: false,
    overlay: false,
})

async function submitFunction() {
    const formData = inputComponent.value.formData
    await TransportRepository.update(propsParent.id, formData)
    pageData.dialog = false
}



async function getTransport(id) {
    pageData.overlay = true
    const formData = inputComponent.value.formData
    const transport = await TransportRepository.show(id)

    formData.number = transport.number
    formData.fuel_type = transport.fuel_type
    formData.number_variant = transport.number_variant
    formData.car_company_id = transport.car.car_company_id

    formData.trunk = Boolean(transport.trunk)

    inputComponent.value.carMarkChanged(formData.car_company_id).then(() => {
        formData.car_id = transport.car_id
        pageData.overlay = false
    })

}
</script>