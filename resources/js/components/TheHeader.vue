<template>
	<header>
		<TheLeftNavigator />
		<TheAppBar />
		<TheLittleAppBar />
	</header>
</template>

<script setup lang="ts">
import TheLeftNavigator from '@/components/TheLeftNavigator.vue'
import TheAppBar from './TheAppBar.vue'
import TheLittleAppBar from './TheLittleAppBar.vue'
</script>