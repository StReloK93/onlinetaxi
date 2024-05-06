<template>
   <div v-if="params.value" class="tw-leading-none d-flex align-center">
      <main>
         <p>
            {{ moment(params.value).format('MMMM DD') }}
         </p>
         <p class="mt-1">
            {{ moment(params.value).format('HH:mm') }}
         </p>
      </main>
      <main v-if="params.data.strictly_on_time" class="ml-4">
         <v-btn density="compact" variant="text" icon="">
            <v-tooltip activator="parent" location="bottom">
               Qat'iy shu vaqtda
            </v-tooltip>
            <v-icon>mdi-book-clock</v-icon>
         </v-btn>
      </main>
   </div>
</template>

<script setup lang="ts">
import moment from '@/modules/moment'
const { params } = defineProps(['params'])
</script>