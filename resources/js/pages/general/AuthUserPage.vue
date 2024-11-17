<template>
  <section class="d-flex flex-column">
    <main>
      <v-tabs v-model="tabs" color="primary" grow>
        <v-tab :value="1">
          <v-icon icon="mdi-taxi"></v-icon>
        </v-tab>

        <v-tab :value="2">
          <v-icon icon="mdi-human-greeting"></v-icon>
        </v-tab>
      </v-tabs>
    </main>

    <main class="flex-grow-1 d-flex pa-2" transition="fab-transition">
      <TransitionGroup name="v-tab-transition">
        <UserRidesTab v-if="tabs == 1" />
        <UserPassengersTab v-if="tabs == 2" />
      </TransitionGroup>
    </main>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserRidesTab from '@/features/AuthUser/UserRidesTab.vue';
import UserPassengersTab from '@/features/AuthUser/UserPassengersTab.vue';
const tabs = ref(1)

</script>