<template>
      <div class="text-right w-100 px-2">
         <v-btn icon="mdi-close" v-if="AppStore.city" @click="clearTopic" color="white" size="x-small" :loading="pageData.clearButtonLoading" />

         <v-btn v-if="pageData.notification" @click="bottomSheet = true" color="white" :text="stringButton" append-icon="mdi-map-marker"
            :loading="pageData.loading"></v-btn>
         <v-btn v-else disabled color="white">Habarnoma o'chirilgan</v-btn>
      </div>
      <v-bottom-sheet v-model="bottomSheet" inset>
         <BaseForm :loading="pageData.overlay" :submit="updateTopic" title="Manzilni o'zgartirish"
            @close="bottomSheet = false" @vue:mounted="formMounted">
            <p>
               <v-icon color="primary">mdi-bell-outline</v-icon>
               Quyida ko'rsatgan manzilingizga qarab yo'lovchilar haqida sizga habarnoma junatamiz.
            </p>
            <v-col cols="12" class="px-0">
               <v-autocomplete @update:model-value="(id) => regionChanged(id)" :items="pageData.regions"
                  v-model="pageData.region_id" label="Viloyat" item-title="name" :item-value="(item: any) => item.id"
                  :rules="rules" />
            </v-col>
            <v-col cols="12" class="px-0">
               <v-autocomplete :disabled="pageData.region_id == null" :items="pageData.region_districts"
                  v-model="formData.city_id" label="Shahar (Tuman)" item-title="name" :loading="pageData.city_loading"
                  :item-value="(item: any) => item.id" :rules="rules" />
            </v-col>
         </BaseForm>
      </v-bottom-sheet>
</template>

<script setup lang="ts">
import axios from "@/modules/AxiosClient"
import { ref, onMounted, reactive, computed } from 'vue'
import { rules } from '@/modules/constants'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
const Auth = useAuthStore()
const AppStore = useMainStore()

const bottomSheet = ref(false)

const stringButton = computed(() => AppStore.city?.name ? AppStore.city?.name : 'Qayerdasiz?')

const pageData = reactive({
   notification: true,
   overlay: false,
   loading: true,
   city_loading: false,
   regions: [],
   region_districts: [],
   region_id: null,
   clearButtonLoading: false,
})

const formData = reactive({
   city_id: null,
   token: Auth.token,
})



async function regionChanged(id) {
   pageData.region_id = id
   pageData.region_districts = []
   pageData.city_loading = true
   formData.city_id = null
   await axios.get(`district/${id}`).then(({ data }) => {
      pageData.region_districts = data
      pageData.city_loading = false
   })
}

async function formMounted() {
   pageData.overlay = true
   formData.city_id = null
   pageData.region_id = null
   const { data: regions } = await axios.get('region')
   pageData.regions = regions

   if(AppStore.city == null) return pageData.overlay = false
   regionChanged(AppStore.city.region_id)
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