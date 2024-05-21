<template>
	<v-app class="bg-grey-lighten-4">
		<Alert />
		<v-main>
			<MyHeader />
			<v-container class="h-100 md:tw-p-4 tw-p-2">
				<router-view class="h-100 tw-relative"></router-view>
			</v-container>
		</v-main>
		<BottomNavigation />
	</v-app>
</template>

<script setup lang="ts">
import MyHeader from '@/components/Header.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Alert from '@/components/Alert.vue'
</script>