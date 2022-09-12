<script setup>
import {ref, onMounted} from 'vue';

const element = ref(null);
const props = defineProps({
	timeSlots: Array
});

const body = document.body;
const observer = new ResizeObserver(entries => {
	entries.forEach(entry => {
		const height = entry.target.offsetHeight;
		body.style.setProperty('--time-listing-height', `${height}px`);
	});
});

onMounted(() => {
	observer.observe(element.value);
});
</script>

<template>
	<header ref="element" class="time-listing sub-grid">
		<time 
			v-for="(timeSlot, index) in timeSlots" 
			:key="index"
		>
		{{timeSlot}}
		</time>
	</header>
</template>

<style lang="scss">
@import '../assets/css/vars';

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
	z-index: 1000;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.75);
	overflow: hidden;

	@include mobile {
		top: 0;
		display: none;
	}

	@include mobileWidth {
		display: none;
	}

	time {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		grid-column: span calc(var(--time-segments) / 2);
		padding: 0 var(--block-padding);

		&:last-child {
			grid-column: span 1;
			width: fit-content;
		}
	}
}
</style>