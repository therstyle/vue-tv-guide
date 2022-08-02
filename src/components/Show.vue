<script setup>
import {computed} from 'vue';
import getShowByID from '../utils/getShowByID';

const props = defineProps({
	shows: Array,
	showID: Number
});

const thisShow = computed(() => {
	return props.shows.find(show => show.id === props.showID);
});

const minutes = computed(() => thisShow.value.runtime != null ? thisShow.value.runtime : 60);
</script>

<template>
	<button class="show-listing__show" :style="`--minutes: ${minutes};`">
		{{thisShow._embedded.show.name}}
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