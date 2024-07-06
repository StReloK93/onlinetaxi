<template>
   <v-row>

      <BaseSelectCity
         v-model="formData.ends[0].city"
			:city="formData.ends[0]"
         :categories="pageData.regions"
         :subCategories="pageData.districts"
         :startText="formData.ends[0].text"
         class="mb-1"
      />
      <BaseSelectCity
         v-model="formData.ends[1].city"
			:city="formData.ends[0]"
         :categories="pageData.regions"
         :subCategories="pageData.districts"
         :startText="formData.ends[1].text"
         class="mb-1"
      />
      <v-col sm="6" cols="12" class="pa-0">
         <VDatePicker
            :trim-weeks="true"
            color="pink"
            v-model.string="formData.day"
            :masks="{ modelValue: 'YYYY-MM-DD HH:mm' }"
            mode="dateTime"
            is24hr
            transparent
            borderless
            expanded
            hide-time-header
            is-required
         />
         <v-text-field
            class="hidden tw-relative -tw-top-2 ml-3"
            hidden
            v-model="formData.day"
            :rules="rules"
            readonly
         />
      </v-col>
      <v-col sm="6" cols="12">
         <v-autocomplete
            class="mb-3"
            @update:model-value="setPhone"
            :items="pageData.cars"
            v-model="formData.user_car_id"
            label="Transport"
            :item-title="(item) => `${item.car?.name} ( ${item.number} )`"
            :item-value="(item) => item.id"
            :rules="rules"
         />

         <BaseUzPhoneInput v-model="formData.phone" />
         <v-text-field
            label="Narxi"
            :rules="rules"
            v-model.lazy="formData.price"
            class="mb-3"
         />
         <v-text-field
            v-model="formData.free_seat"
            type="number"
            label="Bosh o'rindiqlar"
            class="mb-3"
            :rules="rules"
         />
         <input
            v-money3="moneyConfig"
            v-model.lazy="formData.price"
            type="text"
            hidden
         />
         <v-switch
            v-model="formData.strictly_on_time"
            label="Qat'iy shu vaqtda"
            class="px-2"
         ></v-switch>
         <v-switch
            v-model="formData.address_to_address"
            label="Manzilgacha"
            class="px-2"
         ></v-switch>
      </v-col>
   </v-row>
</template>

<script setup lang="ts">
import BaseSelectCity from "@/components/BaseSelectCity.vue";
import axios from "@/modules/AxiosClient";
import { moneyConfig, rules } from "@/modules/constants";
import { reactive, onMounted } from "vue";
import { TransportRepository } from "@/features/Transports";
const emit = defineEmits(["onReady"]);

const formData = reactive({
   user_car_id: null,
   phone: null,
   strictly_on_time: false,
   address_to_address: false,
   ends: [
      {
         region: null,
         city: null,
         loading: false,
         districts: [],
         text: "Qayerdan?",
      },
      {
         region: null,
         city: null,
         loading: false,
         districts: [],
         text: "Qayerga?",
      },
   ],
   day: null,
   price: "",
   free_seat: null,
});

const pageData = reactive({
   overlay: true,
   cars: [],
   regions: [],
   districts: [],
});

function setPhone(id) {
   const car = pageData.cars.find((car) => car.id == id);
   formData.phone = car.user.phone;
}

async function regionChanged(id, index) {
   formData.ends[index].loading = true;
   formData.ends[index].city = null;
   formData.ends[index].districts = [];
   await axios.get(`district/${id}`).then(({ data }) => {
      formData.ends[index].districts = data;
      formData.ends[index].loading = false;
   });
}

defineExpose({ regionChanged, formData });
onMounted(async () => {
   const { data: regions } = await axios.get("region");
   pageData.regions = regions;

   const { data: districts } = await axios.get("district");
   pageData.districts = districts;

   const transports = await TransportRepository.onlyAuthUser();
   pageData.cars = transports;

   emit("onReady");
});
</script>
