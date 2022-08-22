<script setup>
const props = defineProps({
	currentComponent: String
});

const gridClass = {
	"feat-view": props.currentComponent === 'FeatView',
	"grid-view": props.currentComponent === 'GridView'
};
</script>

<template>
	<div class="main-grid" :class="gridClass">
		<slot></slot>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';

.main-grid {
	display: grid;
	grid-template-columns: var(--block-height) auto;
	gap: var(--block-gap);
	padding-bottom: var(--block-gap);

	&.grid-view {
		@include desktop {
			grid-template-rows: var(--preview-height) auto repeat(auto, var(--block-height));
			padding-top: var(--preview-height);
		}

		@include mobile {
			grid-template-rows: auto repeat(auto, var(--block-height));
			padding-top: 0;
		}
	}
}

.sub-grid {
	display: grid;
	grid-auto-columns: calc(var(--hour-width) / var(--time-segments));
	gap: var(--block-gap);
	grid-auto-flow: column;
}
</style>