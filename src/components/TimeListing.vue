<script setup>
const props = defineProps({
	timeSlots: Array
});
</script>

<template>
	<header class="time-listing sub-grid">
		<time 
			v-for="(timeSlot, index) in timeSlots" 
			:key="index"
		>
		{{timeSlot}}
		</time>
	</header>
</template>

<style lang="scss" scoped>
.time-listing {
	background: #333;
	padding: calc(var(--block-padding) / 2) 0;
	grid-column-start: 2;
	position: sticky;
	top: 50vh;
	align-self: start; //workaround for sticky
	display: grid;
	grid-auto-flow: column;
	transition: var(--transition-duration) all ease-in-out;
	z-index: 999;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.75);

	time {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		grid-column: span calc(var(--time-segments) / 2);
		padding: 0 var(--block-padding);
	}
}
</style>