<template>
	<v-app class="bg-grey-lighten-4">
		<TheAlert />
		<v-main>
			<TheHeader />
			<v-container class="h-100 md:tw-p-4 tw-p-2">
				<router-view class="h-100 tw-relative"></router-view>
			</v-container>
		</v-main>
		<TheBottomNavigation />
	</v-app>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheBottomNavigation from '@/components/TheBottomNavigation.vue'
import TheAlert from '@/components/TheAlert.vue'
</script>