<template>
	<div class="container" id="layout-container">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.container {
	margin: 0 auto;
	padding: $containerPaddingY $containerPaddingX;
	width: 100%;
	max-width: $containerMaxWidth;
}
</style>
