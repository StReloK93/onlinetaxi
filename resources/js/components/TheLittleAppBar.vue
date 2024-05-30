<template>
   <v-app-bar density="compact" :elevation="0" :border="1">
      <div class="text-right w-100 px-2">
         <v-btn @click="bottomSheet = true" :text="stringButton" append-icon="mdi-map-marker"
            :loading="pageData.loading"></v-btn>
      </div>
      <v-bottom-sheet v-model="bottomSheet" inset>
         <BaseForm :loading="pageData.overlay" :submit="updateTopic" title="Manzilni o'zgartirish"
            @close="bottomSheet = false" @vue:mounted="formMounted">
            <p class="text-caption">
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
   </v-app-bar>
</template>

<script setup lang="ts">
import axios from "@/repository/Clients/AxiosClient";
import { ref, onMounted, reactive, computed } from 'vue'
import { rules } from '@/modules/constants';
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()

const city = ref(null)
const bottomSheet = ref(false)

const stringButton = computed(() => city.value?.name ? city.value?.name : 'Tanlang')

const pageData = reactive({
   overlay: false,
   loading: true,
   city_loading: false,
   regions: [],
   region_districts: [],
   region_id: null,
})

const formData = reactive({
   city_id: null,
   token: Auth.user.token,
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

   regionChanged(city.value.region_id)
   formData.city_id = city.value.id
   pageData.overlay = false
}

async function updateTopic() {
   const { data: current_city } = await axios.post('firebase/set-city-topic', formData)
   city.value = current_city
}


onMounted(async () => {
   const { data: current_city } = await axios.post('firebase/get-city-topic', { token: Auth.user.token })
   city.value = current_city
   pageData.loading = false
})
</script>