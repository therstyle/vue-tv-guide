<script setup></script>

<template>
	<aside class="channel-listing">
			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/cw.svg);"></span>
			</div>

			<div class="channel-listing__logo">	
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/amc.svg);"></span>
			</div>

			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/cbs.svg);"></span>	
			</div>

			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/fox.svg);"></span>	
			</div>

			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/ifc.svg);"></span>	
			</div>

			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/bet.svg);"></span>	
			</div>

			<div class="channel-listing__logo">
				<span class="channel-listing__logo-img" style="--logo-path: url(/images/channels/amc.svg);"></span>	
			</div>
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

	&__logo {
		padding: var(--block-padding);
		background: #333;
		height: var(--block-height);
		border-radius: var(--block-corner-radius);
	}

	&__logo-img {
		-webkit-mask-image: var(--logo-path);
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		// mask-image: var(--logo-path);
		// mask-size: contain;
		// mask-repeat: no-repeat;
		// mask-position: center;
		background: #FFF;
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>