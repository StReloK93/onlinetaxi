<template>
	<v-app class="bg-grey-lighten-5">
		<Alert />
		<MyHeader />
		<v-main>
			<v-container class="h-100 py-1">
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