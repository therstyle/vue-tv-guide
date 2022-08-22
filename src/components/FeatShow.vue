<script setup>
import {computed, ref, onMounted} from 'vue';
import AppButton from './AppButton.vue';

const props = defineProps({
	show: Object,
	shows: Array
});

const element = ref(null);
const isVisible = ref(false);
const currentShow = computed(() => props.shows.find(show => show.id === props.show.id));
const currentShowBG = computed(() => isVisible.value && currentShow?.value?.show?.image?.original ? currentShow.value.show.image.original : '');

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			isVisible.value = true;
		}
	});
});

onMounted(() => {
	observer.observe(element.value);
});
</script>

<template>
	<div ref="element" class="feat-shows__show" :style="`--background-image: url(${currentShowBG});`">
		<div class="feat-shows__show-wrapper">
			<div class="feat-shows__show-content">
				<small class="feat-shows__show-time" v-if="show?.start">{{show.start}}</small>
				<h2 v-if="currentShow?.show?.name">{{currentShow.show.name}}</h2>
				<div class="feat-shows__show-summary" v-if="currentShow?.show?.summary" v-html="currentShow.show.summary"></div>

				<AppButton 
					v-if="currentShow?.show?.officialSite" 
					:href="currentShow.show.officialSite" 
					target="_blank"
				>
				View More
				</AppButton>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';

.feat-shows {
	&__show {
		min-height: 50vh;
		padding: var(--wrapper-padding);
		padding-left: calc(var(--block-height) + var(--block-gap) + var(--wrapper-padding));
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
		position: relative;
		background: -moz-linear-gradient(top,  rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(top,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.4) 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.4) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			background-image: var(--background-image);
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			opacity: 0.50;
			display: block;
			z-index: -1;
			transition: var(--transition-duration) all ease-in-out;
		}
	}

	&__show-wrapper {
		max-width: var(--max-container-width);
		margin: auto;
	}

	&__show-content {
		max-width: var(--max-text-width);
	}

	&__show-time {
		display: block;
		margin-bottom: 8px;
	}

	&__show-summary {
		line-height: 1.5;
	}
}
</style>