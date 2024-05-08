<template>
	<v-app class="tw-h-screen login-page">
		<v-container class="d-flex h-100 justify-center align-center px-2">
			<v-card width="360" class="pa-3 tw-backdrop-brightness-90 tw-backdrop-blur-sm tw-bg-white/80">
				<router-view></router-view>
			</v-card>
		</v-container>
	</v-app>
</template>