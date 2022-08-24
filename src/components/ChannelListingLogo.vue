<script setup>
import {computed, onMounted, ref, watch} from 'vue';

const imageStatus = ref(false);
const element = ref(null);
const inView = ref(false);
const props = defineProps({
	fileName: String,
	channel: String,
	visible: String,
	currentComponent: String
});

const svgPath = new URL(`../assets/images/logos/${props.fileName}.svg`, import.meta.url).href;
const defaultPath = new URL(`../assets/images/logos/default.svg`, import.meta.url).href;

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

const scrollTo = () => {
	const padding = 10;
	const elementSize = element.value.offsetWidth;
	const target = document.getElementById(`channel-${props.fileName}`);
	let targetTop;
	let targetLeft;

	if (!target) {return};
	if (props.currentComponent === 'GridView') {
		//Mobile has to scroll inside the div due to how overflow works
		if (window.matchMedia('(max-width: 992px)').matches) {
			target.scrollIntoView({
				behavior: 'smooth',
				inline: 'start'
			});
		}
		else {
			targetLeft = target.parentElement.offsetLeft - (elementSize + padding);	
			window.scrollTo({
				behavior: 'smooth',
				left: targetLeft
			});	
		}
	}

	if (props.currentComponent === 'FeatView') {
		targetTop = target.offsetTop;
		window.scrollTo({
			behavior: 'smooth',
			top: targetTop
		});	
	}
};

onMounted(() => {
	observer.observe(element.value);
});

watch(inView, newInView => {
	imageExist(svgPath);
});
</script>

<template>
	<button 
		ref="element" 
		:data-target="`#channel-${props.fileName}`"
		:class="activeClass" 
		class="channel-listing__logo"
		@click="scrollTo"
		>
		<span class="channel-listing__logo-img"
			:data-channel="channel"
			:title="channel"
			:style="`--logo-path: url('${logoImg}')`"
			:class="{inview: inView}"
		>
		</span>
		<small v-if="!imageStatus">{{channel}}</small>
	</button>
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
		color: #FFF;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;

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