<script setup>
import ChannelListingLogo from './ChannelListingLogo.vue';

const props = defineProps({
	channels: Object,
	visible: String,
	currentComponent: String
});
</script>

<template>
	<aside class="channel-listing">
		<template v-for="channel in channels" :key="channel.id">
			<ChannelListingLogo
				v-if="channel.allShows.length > 0" 
				:channel="channel.label" 
				:fileName="channel.fileName"
				:visible="visible" 
				:currentComponent="currentComponent"
			></ChannelListingLogo>
		</template>
	</aside>
</template>

<style lang="scss" scoped>
@import '../assets/css/vars';

.channel-listing {
	position: sticky;
	align-self: start;
	left: 0;
	width: var(--block-height);
	display: grid;
	grid-template-rows: var(--block-height);
	gap: var(--block-gap);
	background: #000;
	transition: var(--transition-duration) all ease-in-out;
	z-index: 10;
	box-shadow: 10px 0 20px rgba(0, 0, 0, 0.75);
}

.grid-view {
	.channel-listing {

		@include desktop {
			grid-row-start: 2;
		}
	}
}

.feat-view {
	.channel-listing {
		grid-row-start: 1;
		grid-column-start: 1;
		top: var(--block-gap);
		margin-top: var(--block-gap);
		background: rgba(0, 0, 0, 0.5);
	}
}
</style>