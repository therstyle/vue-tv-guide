<script setup>
const props = defineProps({
	minutes: Number
});
</script>

<template>
	<button class="show-listing__show" :style="`--minutes: ${props.minutes};`">
		<slot></slot>
	</button>
</template>

<style lang="scss" scoped>
.show-listing {
	&__show {
		--show-span: calc(var(--one-hour) * (var(--minutes) / 60)); //60 * 0.25

		padding: var(--block-padding);
		background: #ccc;
		text-align: left;
		border: none;
		grid-column: span var(--block-size);
		font-size: 24px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #FFF;
		height: 100px;
		border-radius: var(--block-corner-radius);
		display: flex;
		transition: var(--transition-duration) all ease-in-out;
		grid-column: span var(--show-span);

		&:hover {
			background: darken(#ccc, 10%);
		}
	}
}
</style>