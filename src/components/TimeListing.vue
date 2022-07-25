<script setup></script>

<template>
	<header class="time-listing sub-grid">
		<time>12:00pm</time>
		<time>1:00pm</time>
		<time>2:00pm</time>
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
	z-index: 11;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.75);

	time {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		grid-column: span var(--time-segments);
		padding: 0 var(--block-padding);
	}
}
</style>