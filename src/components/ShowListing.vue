<script setup>
import ShowListingChannel from './ShowListingChannel.vue';
import Show from './Show.vue';

const props = defineProps({
	shows: Array,
	channels: Object
});

const emit = defineEmits(['change-current-show']);
const updateCurrentShow = (value) => {
	emit('change-current-show', value);
}
</script>

<template>
	<section class="show-listing">
			<ShowListingChannel 
				v-for="channel in channels" 
				:key="channel.id" 
				:channel="channel.label"
			>
				<Show 
					v-for="show in channel.shows" 
					:key="show.id"
					:shows="shows"
					:showID="show.id"
					@change-current-show="updateCurrentShow"
				>
				</Show>
			</ShowListingChannel>
		</section>
</template>

<style lang="scss" scoped>
.show-listing {
	grid-column-start: 2;
	grid-row-start: 2;
	display: grid;
	gap: var(--block-gap);
	transition: var(--transition-duration) all ease-in-out;
}
</style>