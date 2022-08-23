<script setup>
import {computed, onMounted, ref, watch} from 'vue';

const imageStatus = ref(false);
const element = ref(null);
const inView = ref(false);
const props = defineProps({
	fileName: String,
	channel: String,
	visible: String
});

const svgPath = new URL(`../assets/images/${props.fileName}.svg`, import.meta.url).href;
const defaultPath = new URL(`../assets/images/default.svg`, import.meta.url).href;

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			inView.value = true;
		}
	});
});

const imageExist = async (svgPath) => {
	try {
		const svgResponse = await fetch(svgPath);

		if (svgResponse.ok) {
			imageStatus.value = svgPath;
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

const activeClass = computed(() => ({"active": props.visible === props.fileName}));

onMounted(() => {
	observer.observe(element.value);
});

watch(inView, newInView => {
	imageExist(svgPath);
});
</script>

<template>
	<div ref="element" class="channel-listing__logo" :class="activeClass">
		<span class="channel-listing__logo-img"
			:data-channel="channel"
			:title="channel"
			:style="`--logo-path: url('${logoImg}')`"
			:class="{inview: inView}"
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
		border: 1px solid transparent;
		transition: var(--transition-duration) 0.3s border ease-in-out;

		&.active {
			border-color: rgba(244, 146, 53, 0.5);
		}
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
		opacity: 0;
		transition: var(--transition-duration) all ease-in-out;

		&.inview {
			opacity: 1;
		}
	}
}
</style>