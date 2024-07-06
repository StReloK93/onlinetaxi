<template>
	<v-app class="bg-grey-lighten-4">
		<FormAddTransportForce />
		<TheAlert />
		<v-main>
			<TheHeader />
			<v-container class="h-100 pb-3">
				<router-view class="h-100 position-relative mx-n2"></router-view>
			</v-container>
		</v-main>
		<TheBottomNavigation />
	</v-app>
</template>

<script setup lang="ts">

import TheHeader from '@/components/TheHeader.vue'
import TheBottomNavigation from '@/components/TheBottomNavigation.vue'
import TheAlert from '@/components/TheAlert.vue'
import FormAddTransportForce from '@/features/Transports/components/FormAdd-TransportForce.vue'
</script>