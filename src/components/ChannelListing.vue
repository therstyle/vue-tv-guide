<script setup>
import ChannelListingLogo from './ChannelListingLogo.vue';
</script>

<template>
	<aside class="channel-listing">
		<ChannelListingLogo channel="amc" logo="amc.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="bet" logo="bet.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="cbs" logo="cbs.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="cw" logo="cw.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="fox" logo="fox.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="ifc" logo="ifc.svg"></ChannelListingLogo>
		<ChannelListingLogo channel="espn" logo="espn.svg"></ChannelListingLogo>
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