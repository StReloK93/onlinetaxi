<template>
   <div class="text-right w-100 mt-2">
      <v-btn v-if="pageData.notification" variant="tonal" @click="bottomSheetToggle = true" :text="stringButton"
         append-icon="mdi-map-marker" :loading="pageData.loading" block></v-btn>
      <v-btn v-else disabled color="white" block>Habarnoma o'chirilgan</v-btn>
   </div>
   <v-bottom-sheet v-model="bottomSheetToggle" inset>
      <BaseForm :loading="pageData.overlay" :submit="updateTopic" title="Manzilni o'zgartirish"
         @close="bottomSheetToggle = false" @vue:mounted="formMounted">
         <p class="mb-3">
            <v-icon color="primary">mdi-bell-outline</v-icon>
            Quyida ko'rsatgan manzilingizga qarab yo'lovchilar haqida sizga habarnoma junatamiz.
         </p>
         <BaseSelectCity :categories="pageData.regions" :subCategories="pageData.districts" :loading="pageData.loading"
            v-model="formData.city_id" startText="Tanlang?" class="mb-1" />
         <template v-slot:action>
            <v-btn color="primary" v-if="AppStore.city" :loading="pageData.clearButtonLoading" append-icon="mdi-close" variant="text" @click="clearTopic">
               O'chirish
            </v-btn>
         </template>
      </BaseForm>
   </v-bottom-sheet>
</template>

<script setup lang="ts">
import BaseSelectCity from "./BaseSelectCity.vue"
import axios from "@/modules/AxiosClient"
import { ref, onMounted, reactive, computed } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const Auth = useAuthStore()
const AppStore = useMainStore()

const bottomSheetToggle = ref(false)

const stringButton = computed(() => AppStore.city?.name ? AppStore.city?.name : 'Qayerdasiz?')

const pageData = reactive({
   notification: true,
   overlay: false,
   loading: true,
   regions: [],
   districts: [],
   clearButtonLoading: false,
})

const formData = reactive({
   city_id: null,
   token: Auth.token,
})

async function formMounted() {
   pageData.overlay = true
   formData.city_id = null
   const { data: regions } = await axios.get("region");
   pageData.regions = regions;

   const { data: districts } = await axios.get("district");
   pageData.districts = districts;

   if (AppStore.city == null) return pageData.overlay = false
   formData.city_id = AppStore.city.id
   pageData.overlay = false
}

async function clearTopic() {
   pageData.clearButtonLoading = true
   await axios.post('firebase/set-city-topic', {
      city_id: null,
      token: Auth.token,
   })
   AppStore.city = null
   pageData.clearButtonLoading = false
   bottomSheetToggle.value = false
}

async function updateTopic() {
   const { data: current_city } = await axios.post('firebase/set-city-topic', formData)
   AppStore.city = current_city
}

onMounted(async () => {
   axios.post('firebase/get-city-topic', { token: Auth.token }).then(({ data: current_city }) => {
      AppStore.city = current_city
      pageData.loading = false
   }).catch(() => {
      console.clear()
      pageData.notification = false
      pageData.loading = false
   })
})
</script>