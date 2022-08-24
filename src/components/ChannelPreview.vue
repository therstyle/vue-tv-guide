<script setup>
import {ref, computed, onMounted} from 'vue';
import currentShowID from '../state/currentShowID';
import AppButton from './AppButton.vue';

const props = defineProps({
	shows: Array,
	channels: Object,
	currentShowID: Number,
	showPanelOpen: Boolean
});

const emit = defineEmits(['close-show-panel']);
const closeShowPanel = () => {
	emit('close-show-panel', false);
}

const currentShow = computed(() => {
	const show = props.shows && props.currentShowID ? props.shows.find(show => show.id === props.currentShowID) : false;
	return show;
});

const showTime = computed(() => {
	let value;
	for (const channel in props.channels) {
		if (props.channels[channel].shows.find(show => show.id === props.currentShowID) !== undefined) {
			value = props.channels[channel].shows.find(show => show.id === props.currentShowID);
		}
	}

	return value;
});

const currentShowBG = computed(() => currentShow?.value?.show?.image?.original ? currentShow.value.show.image.original : '');
const closeIcon = new URL('../assets/images/close.svg', import.meta.url).href;

const observers = () => {
	const body = document.body;
	const showListing = document.querySelector('.show-listing');
	let showListingWidth = showListing.offsetWidth;

	body.style.setProperty('--body-min-width', `${showListingWidth}px`);

	const showListingObserver = new ResizeObserver(entries => {
		showListingWidth = showListing.offsetWidth;

		entries.forEach(entry => {
			body.style.setProperty('--body-min-width', `${showListingWidth}px`);
		});
	});

	showListingObserver.observe(showListing);
}

onMounted(() => {
	observers();
});
</script>

<template>
	<div class="channel-preview photo-bg" :class="{active: props.showPanelOpen}" :style="`--background-image: url(${currentShowBG});`">
		<div class="channel-preview__wrapper">
			<button 
				class="channel-preview__close"
				:style="`--icon-path: url(${closeIcon});`" 
				@click="closeShowPanel"
			></button>

			<div class="channel-preview__content">
				<div class="channel-preview__description">
					<small class="photo-bg__show-time" v-if="showTime?.start">{{showTime.start}}</small>
          <h1 v-if="currentShow?.show?.name">{{currentShow.show.name}}</h1>
          <div v-if="currentShow?.show?.summary" v-html="currentShow.show.summary"></div>

					<AppButton v-if="currentShow?.show?.officialSite" :href="currentShow.show.officialSite" target="_blank">View More</AppButton>
        </div>

				<div v-if="currentShow?.show?.image?.medium" class="channel-preview__image">
					<figure>
						<img :src="currentShow.show.image.medium" :alt="currentShow.show.name" loading="lazy">
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';
@import '../assets/css/photo-bg';

.channel-preview {
	background: var(--canvas-color);
	min-height: calc(var(--preview-height) + var(--time-listing-height));
	grid-column: span 2;
	align-self: start;
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 100%;
	top: 0;
	left: 0;
	gap: var(--block-gap);
	text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
	z-index: 100;

	@include mobile {
		display: none;
		width: 100vw;
		height: 100vh;
		height: -webkit-fill-available;
		overflow: auto;
		z-index: 2000;
	}

	&.active {
		@include mobile {
			display: flex;
		}
	}

	&::before {
		@include mobile {
			background-position: top center;
			background-attachment: scroll;
			width: 100vw;
			opacity: 0.4;
		}
	}

	&__wrapper {
		flex: 1;
		padding-top: var(--wrapper-padding);
		padding-left: calc(var(--block-height) + var(--block-gap));

		@include mobile {
			padding: var(--wrapper-padding);
			overflow: scroll;
		}
	}

	&__close {
		display: none;
		position: absolute;
		top: var(--wrapper-padding);
		right: var(--wrapper-padding);
		width: 32px;
		height: 32px;
		border-radius: 100%;
		padding: 0;
		border: 2px solid #FFF;
		padding: 2px;
		background: transparent;
		color: #FFF;
		justify-content: center;
		align-items: center;
		transition-duration: var(--transition-duration) all ease-in-out;
		z-index: 3000;

		&:hover {
			opacity: 0.75;
		}

		@include mobile {
			display: flex;
		}

		&::before {
			content: '';
			display: block;
			width: 16px;
			height: 16px;
			background: currentColor;
			-webkit-mask-image: var(--icon-path);
			-webkit-mask-size: cover;
			mask-image: var(--icon-path);
			mask-size: cover;
		}
	}

	&__content {
		flex: 1;
		max-width: var(--max-container-width);
		display: flex;
		gap: 48px;

		@include mobile {
			margin: auto;
			flex-direction: column-reverse;
		}
	}

	&__description {
		line-height: 1.5;
		flex: 1;
		max-width: var(--max-text-width);

		@include mobile {
			max-width: 100%;
		}
	}

	&__image {
		flex: 1;
		z-index: 10;
		text-align: center;

		@include desktop {
			text-align: left;
		}

		img {
			box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
		}
	}
}
</style>