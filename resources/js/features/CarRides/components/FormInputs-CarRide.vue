<template>
   <v-row>
      <BaseSelectCity
         v-model="formData.start_city"
			:loading="pageData.start_loading"
         :categories="pageData.regions"
         :subCategories="pageData.districts"
         startText="Qayerdan?"
         class="mb-1"
      />
      <BaseSelectCity
         v-model="formData.end_city"
         v-model:address="formData.address_to_address"
			:loading="pageData.end_loading"
         :categories="pageData.regions"
         :subCategories="pageData.districts"
         startText="Qayerga?"
         class="mb-1"
      />
      <BaseSelectTimeInput v-model:datetime="formData.day"/>
      <v-col cols="12">
         <v-select
            v-if="pageData.cars.length > 1"
            class="mb-3"
            :items="pageData.cars"
            v-model="formData.user_car_id"
            label="Transport"
            :item-title="(item) => `${item.car?.name} ( ${item.number} )`"
            :item-value="(item) => item.id"
            :rules="rules"
         />
         <BaseUzPhoneInput v-model="formData.phone" />

         <v-text-field
            inputmode="numeric"
            label="Yo'lkira narxi"
            :rules="rules"
            v-model.lazy="formData.price"
            class="mb-3"
         />
         <input v-money3="moneyConfig" v-model.lazy="formData.price" type="text" hidden/>

			<v-label class="v-label text-caption">
				Bosh o'rindiqlar =  {{ formData.free_seat }}
			</v-label>
			<main class="w-100 overflow-hidden mt-n1">
				<v-rating color="dark" empty-icon="mdi-account-outline"
					full-icon="mdi-account" v-model="formData.free_seat" size="small" length="6" class="mx-n3"></v-rating>
			</main>
         <v-switch
            v-model="formData.strictly_on_time"
            label="Qat'iy shu vaqtda"
            class="px-2"
         ></v-switch>
      </v-col>
   </v-row>
</template>

<script setup lang="ts">
import BaseSelectCity from "@/components/BaseSelectCity.vue";
import BaseSelectTimeInput from "@/components/BaseSelectTimeInput.vue"
import axios from "@/modules/AxiosClient";
import { moneyConfig, rules } from "@/modules/constants";
import { reactive, onMounted, watch } from "vue";
import UserRepository from "@/features/AuthUser/UserRepository";
import { useAuthStore } from "@/store/useAuthStore"

const AuthStore = useAuthStore()

const emit = defineEmits(["onReady", "onCarEmpty"]);


const pageData = reactive({
   overlay: true,
   cars: [],
   regions: [],
   districts: [],
   start_loading: false,
   end_loading: false,

});

const formData = reactive({
   user_car_id: null,
   phone: AuthStore.user.phone,
   strictly_on_time: false,
   address_to_address: false,
   start_city: null,
   end_city: null,
   day: null,
   price: "",
   free_seat: 1,
});



watch(() => formData.free_seat, (currentValue) => {
	if (currentValue < 1) return formData.free_seat = 1
})


defineExpose({ formData });
onMounted(async () => {
   pageData.cars = await UserRepository.cars()
   if(pageData.cars.length == 0) {
      emit('onCarEmpty')
      return emit("onReady");
   }


   formData.user_car_id = pageData.cars.length == 1 ? pageData.cars[0].id : null
   const { data: regions } = await axios.get("region");
   pageData.regions = regions;

   const { data: districts } = await axios.get("district");
   pageData.districts = districts;
   emit("onReady");
});
</script>
