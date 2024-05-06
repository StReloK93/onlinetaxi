<template>
   <v-form @submit.prevent="submit" class="text-center d-flex flex-column tw-items-center">
      <div class="d-flex tw-justify-start w-100">
         <v-btn @click="$router.go(-1)" icon="mdi-arrow-left-thin" size="small" variant="tonal" />
      </div>
      <h3 class="text-h5 font-weight-bold">Telefon raqamni tasdiqlash</h3>
      <p class="my-2 d-flex tw-items-center tw-justify-start">
         <span class="tw-text-sm font-weight-bold text-grey-darken-3">
            +998 <input type="text" class="tw-w-[90px]" v-maska:[options] v-model="statePhone" disabled>
         </span>
      </p>
      <div class="text-red">
         {{ errors }}
      </div>
      <p class="text-grey-darken-1 w-75 ">
         Kiritgan raqamingizga tasdiqlovchi maxfiy kod junatildi.
      </p>
      <v-otp-input v-model="secredCode" length="5"></v-otp-input>

      <main class="mb-4">

         <div v-if="timer.seconds.value != 0">
            {{ timer.formatted() }}
         </div>
         <v-btn v-else @click="repeatSendSMS" variant="tonal" type="button" size="x-small">Qayta yuborish</v-btn>
      </main>

      <v-btn type="submit" :loading="loading" append-icon="mdi-login" class="w-50"
         :disabled="secredCode.length > 4 == false">
         Tasdiqlash
      </v-btn>
   </v-form>
</template>

<script setup lang="ts">
import Timer from '@/modules/timer'
import { ref } from 'vue'
import { vMaska } from "maska"
import { useAuthStore } from '@/store'
const authStore = useAuthStore()
const errors = ref(null)
const timer = new Timer(300)

const statePhone = history.state.props.phone
const options = { mask: '## ###-##-##' }

const secredCode = ref('')
const loading = ref(false)

async function submit() {
   loading.value = true
   await authStore.login({ code: +secredCode.value, phone: statePhone }).then((error) => {
      if (error) {
         errors.value = error.response?.data?.message
         setTimeout(() => errors.value = null, 5000)
         if (error.response?.data?.code == 2) timer.stop()
      }
   })
   loading.value = false
}

async function repeatSendSMS() {
   await authStore.sendSecretCode({ phone: statePhone })
   timer.restart()
}

</script>