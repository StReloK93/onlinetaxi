<template>
    <v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
        <CustomForm :submit="submitFunction" title="Transportni tahrirlash" @close="pageData.dialog = false">
            <Inputs ref="inputComponent" />
        </CustomForm>
    </v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
const inputComponent = ref()

const emit = defineEmits(['update'])

const pageData = reactive({
    dialog: false,
    car_ride: null
})

async function submitFunction() {
    const formData = inputComponent.value.formData
    await axios.put(`car/${pageData.car_ride.id}`, formData)
    .then(({data}) => emit('update', data))
}



function getTransport(id){
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

const toggle = (car_ride) => {
    pageData.dialog = true
    pageData.car_ride = car_ride
    getTransport(car_ride.id)
}
defineExpose({ toggle })
</script>