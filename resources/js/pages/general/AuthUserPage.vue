<template>
  <section class="d-flex flex-column">
    <main>
      <v-tabs v-model="tabs" color="primary"  grow>
        <v-tab :value="1">
          <v-icon icon="mdi-taxi" class="mr-2"></v-icon>
          Haydovchi
        </v-tab>

        <v-tab :value="2">
          <v-icon icon="mdi-human-greeting" class="mr-2"></v-icon>
          Yo'lovchi
        </v-tab>
      </v-tabs>
    </main>

    <main class="flex-grow-1 d-flex pa-2">
      <v-slide-x-reverse-transition mode="out-in">
        <UserRidesTab v-if="tabs == 1" />
        <UserPassengersTab v-if="tabs == 2" />
      </v-slide-x-reverse-transition
>
    </main>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserRidesTab from '@/features/AuthUser/UserRidesTab.vue';
import UserPassengersTab from '@/features/AuthUser/UserPassengersTab.vue';
const tabs = ref(1)

</script>