<template>
    <section class="pa-2 w-100">
        <div>
            <aside class="d-flex justify-space-between tw-text-2xl">
                <h3 class="tw-uppercase">
                    {{ Transport.type }}
                </h3>
                <h3 class="text-primary">{{ Transport.number }}</h3>
            </aside>

        </div>
    </section>
</template>
<script setup lang="ts">
import { ITransport } from '@/app/interfaces'
const props = defineProps(['params'])
const Transport = props.params.data as ITransport
console.log(Transport)

</script>