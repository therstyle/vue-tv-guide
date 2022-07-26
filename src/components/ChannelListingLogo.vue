<script setup>
import {computed} from 'vue';
import getImageUrl from '../utils/getImageUrl';

const props = defineProps({
	logo: String,
	channel: String
});

const logoPath = computed(() => getImageUrl(props.logo));
</script>

<template>
	<div class="channel-listing__logo">
		<span class="channel-listing__logo-img"
			v-bind:data-channel="channel"
			:style="`--logo-path: url('${logoPath}')`"
		>
		</span>
	</div>
</template>

<style lang="scss" scoped>
.channel-listing {
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
		mask-image: var(--logo-path);
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		background: #FFF;
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>