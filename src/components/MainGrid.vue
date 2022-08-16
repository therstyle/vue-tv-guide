<template>
	<div class="main-grid">
		<slot></slot>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';

.main-grid {
	display: grid;
	grid-template-columns: var(--block-height) auto;
	grid-template-rows: var(--preview-height) auto repeat(auto, var(--block-height));
	gap: var(--block-gap);
	padding-top: var(--preview-height);
	padding-bottom: var(--block-gap);

	@include mobile {
		grid-template-rows: auto repeat(auto, var(--block-height));
		padding-top: 0;
	}
}

.sub-grid {
	display: grid;
	grid-auto-columns: calc(var(--hour-width) / var(--time-segments));
	gap: var(--block-gap);
	grid-auto-flow: column;
}
</style>