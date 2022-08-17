<script setup>
import {ref, computed, onMounted} from 'vue';

const props = defineProps({
	shows: Array,
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
const currentShowTitle = computed(() => currentShow?.value?.show?.name ? currentShow.value.show.name : null);
const currentShowSummary = computed(() => currentShow?.value?.show?.summary ? currentShow.value.show.summary : null);
const currentShowBG = computed(() => currentShow?.value?.show?.image?.original ? currentShow.value.show.image.original : '');
const currentShowThumb = computed(() => currentShow?.value?.show?.image?.medium ? currentShow.value.show.image.medium : '');
const watchURL = computed(() => currentShow?.value?.show?.officialSite ? currentShow.value.show.officialSite : false);
const playIcon = new URL('../assets/images/play.svg', import.meta.url).href;
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
	<div class="channel-preview" :class="{active: props.showPanelOpen}" :style="`--preview-image: url(${currentShowBG});`">
		<div class="channel-preview__wrapper">
			<button 
				class="channel-preview__close"
				:style="`--icon-path: url(${closeIcon});`" 
				@click="closeShowPanel"
			></button>

			<div class="channel-preview__content">
				<div class="channel-preview__description">
          <h1>{{currentShowTitle}}</h1>
          <div v-html="currentShowSummary"></div>

					<a v-if="watchURL" :href="watchURL" target="_blank" class="channel-preview__watch" :style="`--icon-path: url(${playIcon});`">Watch</a>
        </div>

				<div v-if="currentShowThumb" class="channel-preview__image">
					<figure>
						<img :src="currentShowThumb" :alt="currentShowTitle" loading="lazy">
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/css/vars';

@include mobile { 
	body {
			min-height: 100vh;
			min-height: fill-available;
			min-height: -webkit-fill-available;
	}
	html {
			height: fill-available;
			height: -webkit-fill-available;
	}
}

.channel-preview {
	background: var(--canvas-color);
	min-height: var(--preview-height);
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
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background-image: var(--preview-image);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		opacity: 0.66;
		display: block;
		z-index: -1;
		transition: var(--transition-duration) all ease-in-out;

		@include mobile {
			background-position: top center;
			background-attachment: scroll;
			width: 100vw;
			opacity: 0.4;
		}
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		display: block;
		width: 100%;
		height: var(--preview-height);
		z-index: -1;
		background: -moz-linear-gradient(left,  hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,1) 75%, hsla(0,0%,0%,1) 100%);
		background: -webkit-linear-gradient(left,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 75%,hsla(0,0%,0%,1) 100%);
		background: linear-gradient(to right,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 75%,hsla(0,0%,0%,1) 100%);

		@include mobile {
			height: 100vh;
			opacity: 0.6;
		}
	}

	&__wrapper {
		flex: 1;
		padding-top: var(--wrapper-padding);
		padding-left: calc(var(--block-height) + var(--block-gap));

		@include mobile {
			padding: var(--wrapper-padding);
		}

		&::before {
			content: '';
			width: 100%;
			height: 50%;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: -1;
			background: -moz-linear-gradient(top,  hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,1) 100%);
			background: -webkit-linear-gradient(top,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 100%);
			background: linear-gradient(to bottom,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 100%);
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
		max-width: var(--container-max-width);
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
		max-width: 600px;

		@include mobile {
			max-width: 100%;
		}
	}

	&__watch {
		display: inline-flex;
		gap: 16px;
		justify-content: center;
		align-items: center;
		text-shadow: none;
		font-weight: bold;
		color: #FFF;
		background: orange;
		padding: 16px 64px;
		border-radius: 32px;
		text-decoration: none;
		margin-top: 64px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
		transition: var(--transition-duration) all ease-in-out;
		border: 3px solid rgba(255, 255, 255, 0.50);

		&::before {
			content:'';
			width: 24px;
			height: 24px;
			display: block;
			background-color: currentColor;
			-webkit-mask-image: var(--icon-path);
			-webkit-mask-size: cover;
			mask-image: var(--icon-path);
			mask-size: cover;
		}

		&:hover {
			box-shadow: 2px 2px 16px 10px rgba(219, 140, 50, 0.66);
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