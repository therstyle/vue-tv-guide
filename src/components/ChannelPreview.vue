<script setup>
import {computed} from 'vue';

const props = defineProps({
	shows: Array,
	currentShowID: Number
});

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
console.log(playIcon);
</script>

<template>
	<div class="channel-preview" :style="`--preview-image: url(${currentShowBG});`">
		<div class="channel-preview__wrapper">
			<div class="channel-preview__content">
				<div class="channel-preview__description">
          <h1>{{currentShowTitle}}</h1>
          <div v-html="currentShowSummary"></div>

					<a v-if="watchURL" :href="watchURL" target="_blank" class="channel-preview__watch" :style="`--icon-path: url(${playIcon});`">Watch</a>
        </div>

				<div v-if="currentShowThumb" class="channel-preview__image">
					<figure>
						<img :src="currentShowThumb" :alt="currentShowTitle">
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
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
	}

	&__wrapper {
		flex: 1;
		padding-top: var(--wrapper-padding);
		padding-left: calc(var(--block-height) + var(--block-gap));

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

	&__content {
		flex: 1;
		max-width: var(--container-max-width);
		display: flex;
		gap: 24px;
	}

	&__description {
		line-height: 1.5;
		flex: 1;
		max-width: 600px;
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

		img {
			box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
		}
	}
}
</style>