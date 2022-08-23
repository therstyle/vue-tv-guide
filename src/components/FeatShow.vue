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
	<div ref="element" class="feat-shows__show photo-bg" :style="`--background-image: url(${currentShowBG});`">
		<div class="feat-shows__show-wrapper">
			<div class="feat-shows__show-content">
				<small class="photo-bg__show-time" v-if="show?.start">{{show.start}}</small>
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
@import '../assets/css/photo-bg';

.feat-shows {
	&__show {
		min-height: 50vh;
		padding: var(--wrapper-padding);
		padding-left: calc(var(--block-height) + var(--block-gap) + var(--wrapper-padding));
		position: relative;
	}

	&__show-wrapper {
		max-width: var(--max-container-width);
		margin: auto;
	}

	&__show-content {
			max-width: var(--max-text-width);
		}

	&__show-summary {
		line-height: 1.5;
	}
}
</style>