<script setup>
import {computed} from 'vue';
import AppButton from './AppButton.vue';

const props = defineProps({
	show: Object,
	shows: Array
});

const currentShow = computed(() => props.shows.find(show => show.id === props.show.id));
</script>

<template>
	<div class="feat-shows__show">
		<div class="feat-shows__show-wrapper">
			<div class="feat-shows__show-content">
				<h2 v-if="currentShow?.show?.name">{{currentShow.show.name}}</h2>
				<div class="feat-shows__show-summary" v-if="currentShow?.show?.summary" v-html="currentShow.show.summary"></div>
				<AppButton 
					v-if="currentShow?.show?.officialSite" 
					:href="currentShow.show.officialSite" 
					target="_blank"
				>View More</AppButton>
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