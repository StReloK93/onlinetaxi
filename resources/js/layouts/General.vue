<template>
	<v-app class="bg-grey-lighten-4">
		<TheAlert />
		<v-main>
			<TheHeader />
			<router-view class="h-100 position-relative"></router-view>
		</v-main>
		<TheBottomNavigation />
	</v-app>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheBottomNavigation from '@/components/TheBottomNavigation.vue'
import TheAlert from '@/components/TheAlert.vue'
</script>