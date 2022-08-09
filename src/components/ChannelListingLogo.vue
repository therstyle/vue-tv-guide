<script setup>
import {computed, onMounted, ref} from 'vue';

const props = defineProps({
	fileName: String,
	channel: String
});

const imageStatus = ref(false);
const svgPath = new URL(`../assets/images/${props.fileName}.svg`, import.meta.url).href;
const pngPath = new URL(`../assets/images/${props.fileName}.png`, import.meta.url).href;
const defaultPath = new URL(`../assets/images/default.svg`, import.meta.url).href;

const imageExist = async (svgPath, pngPath) => {
	try {
		const svgResponse = await fetch(svgPath);
		const pngResponse = await fetch(pngPath);

		if (svgResponse.ok) {
			imageStatus.value = svgPath;
		}
		else if (pngResponse.ok && !svgResponse.ok) {
			imageStatus.value = pngPath;
		}
	}
	catch(error) {
		console.error(error);
	}
}

const logoImg = computed(() => {
	if (imageStatus.value) {
		return imageStatus.value;
	}
	else {
		return defaultPath;
	}
});

onMounted(() => {
	imageExist(svgPath, pngPath);
});
</script>

<template>
	<div class="channel-listing__logo">
		<span class="channel-listing__logo-img"
			:data-channel="channel"
			:title="channel"
			:style="`--logo-path: url('${logoImg}')`"
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