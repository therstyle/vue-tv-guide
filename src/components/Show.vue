<script setup>
import {computed} from 'vue';

const props = defineProps({
	shows: Array,
	showID: Number,
	start: String,
	end: String,
	duration: Number,
	index: Number,
	channelKey: String,
	channels: Object
});

const thisShow = computed(() => {
	return props.shows.find(show => show.id === props.showID);
});

const isFirstShow = computed(() => (props.channels[props.channelKey].shows[0].id === props.showID));
const minutes = computed(() => props.duration ? props.duration : 60);
const emit = defineEmits(['change-current-show']);
const updateCurrentShow = (value) => {
	emit('change-current-show', value);
}
</script>

<template>
	<button :id="`show-${props.showID}`" v-if="thisShow" class="show-listing__show"
		:data-start-time="props.start"
		:data-end-time="props.end" 
		:style="`--minutes: ${minutes};`"
		@click="updateCurrentShow(props.showID)"
		>
		<span class="show-listing__show-time">{{props.start}}</span>
		<span class="show-listing__show-title">{{thisShow.show.name}}</span>
	</button>

	<div v-else class="show-listing__show unknown"
		:data-start-time="props.start"
		:data-end-time="props.end" 
		:style="`--minutes: ${minutes};`"
	>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';

.show-listing {
	&__jump-link {

	}

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
		flex-direction: column;
		transition: var(--transition-duration) all ease-in-out;
		grid-column: span var(--show-span);

		&:hover {
			background: darken(#ccc, 10%);
		}

		&.unknown {
			pointer-events: none;
			background: darken(#ccc, 50%);
		}
	}

	&__show-time {
		display: none;
		font-size: 14px;

		@include mobile {
			display: block;
		}
	}

	&__show-title {
		display: block;
	}
}
</style>