<script setup>
import ChannelListingLogo from './ChannelListingLogo.vue';

const props = defineProps({
	channels: Object
});
</script>

<template>
	<aside class="channel-listing">
		<ChannelListingLogo v-for="channel in channels" :channel="channel.label" logo="amc.svg" :key="channel.id"></ChannelListingLogo>
	</aside>
</template>

<style lang="scss" scoped>
.channel-listing {
	position: sticky;
	align-self: start;
	left: 0;
	width: var(--block-height);
	display: grid;
	grid-template-rows: var(--block-height);
	gap: var(--block-gap);
	grid-row-start: 2;
	background: #000;
	transition: var(--transition-duration) all ease-in-out;
	z-index: 10;
	box-shadow: 10px 0 20px rgba(0, 0, 0, 0.75);
}
</style>