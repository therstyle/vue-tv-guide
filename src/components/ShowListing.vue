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
			<template v-for="channel in channels" :key="channel.id" >
				<ShowListingChannel
					v-if="channel.allShows.length > 0"  
					:channel="channel.label"
				>
					<Show 
						v-for="(show, index) in channel.allShows" 
						:key="index"
						:index="index"
						:channels="channels"
						:channelKey="channel.fileName"
						:shows="shows"
						:showID="show.id"
						:start="show.start"
						:end="show.end"
						:duration="show.duration"
						@change-current-show="updateCurrentShow"
					>
					</Show>
				</ShowListingChannel>
			</template>
		</section>
</template>

<style lang="scss">
@import '../assets/css/vars';

.show-listing {
	grid-column-start: 2;
	display: grid;
	gap: var(--block-gap);
	transition: var(--transition-duration) all ease-in-out;

	@include desktop {
		grid-row-start: 2;
	}

	@include mobile {
		overflow-y: hidden;
	}
}
</style>