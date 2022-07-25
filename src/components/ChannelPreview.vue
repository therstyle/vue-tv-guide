<script setup></script>

<template>
	<div class="channel-preview">
		<div class="channel-preview__wrapper">
			<div class="channel-preview__content">
				<div class="channel-preview__description">
					<h1>Show Title</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet libero quis lacus fermentum euismod eget sit amet orci. In interdum ac elit vel viverra.</p>
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
		height: var(--preview-height);
		background-image: url(images/preview-bg.jpg);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		opacity: 0.66;
		display: block;
		z-index: -1;
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
			background: -moz-linear-gradient(top,  hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,1) 100%);
			background: -webkit-linear-gradient(top,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 100%);
			background: linear-gradient(to bottom,  hsla(0,0%,0%,0) 0%,hsla(0,0%,0%,1) 100%);
		}
	}

	&__content {
		flex: 1;
		max-width: var(--container-max-width);
	}

	&__description {
		max-width: 600px;
		line-height: 1.5;
	}
}
</style>