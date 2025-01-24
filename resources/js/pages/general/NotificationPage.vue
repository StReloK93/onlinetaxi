<template>
   <main class="d-flex tw-flex-col pa-2">
      <v-spacer class="position-relative">
         <main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
            <h2  class="font-weight-regular mb-2">
               Habarnomalar
            </h2>
            <v-alert v-for="notify in user_notifications" density="compact" :color="notify.readed ? 'gray' : 'pink'" class="mb-2" :variant="notify.readed ? 'flat' : 'tonal'">
               <template v-slot:title>
                  {{ notify.title }}
               </template>
               <p class="mt-1 text-body-2">
                  {{ notify.description }}
               </p>
               <div class="text-right">
                  <v-btn :to="notify.url" icon="mdi-chevron-right" variant="text" />
               </div>
            </v-alert>
         </main>
      </v-spacer>
   </main>
</template>

<script setup lang="ts">
import UserRepository from '@/features/AuthUser/UserRepository';
import { onMounted, ref } from 'vue';

const user_notifications = ref([])

onMounted(async () => {
   user_notifications.value = await UserRepository.notifications()

   UserRepository.updateNotifications()
})
</script>