<template>
	<v-app class="tw-h-screen login-page">
		<v-container class="tw-flex tw-h-full tw-justify-center tw-items-center">
			<v-stepper width="500" style="backdrop-filter: brightness(90%) blur(4px);" v-model="step"
				bg-color="rgb(255, 255, 255, 0.7)">
				<v-stepper-header class="elevation-0 d-none">
					<v-stepper-item icon="mdi-phone" value="phone" />
					<v-stepper-item icon="mdi-message" value="message" />
				</v-stepper-header>
				<v-stepper-window>
					<v-stepper-window-item value="phone">
						<router-view></router-view>
					</v-stepper-window-item>
				</v-stepper-window>
			</v-stepper>
		</v-container>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const step = ref('phone')
</script>