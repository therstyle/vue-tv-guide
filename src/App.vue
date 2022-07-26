<script setup>
import vars from './assets/css/vars.scss';
import MainGrid from './components/MainGrid.vue';
import ChannelPreview from './components/ChannelPreview.vue';
import TimeListing from './components/TimeListing.vue';
import ChannelListing from './components/ChannelListing.vue';
import ShowListing from './components/ShowListing.vue';
</script>

<template>
	<MainGrid>
		<ChannelPreview 
			title="Show Title"
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet libero quis lacus fermentum euismod eget sit amet orci. In interdum ac elit vel viverra."
		>
		</ChannelPreview>
		<TimeListing></TimeListing>
		<ChannelListing></ChannelListing>
		<ShowListing></ShowListing>
	</MainGrid>
</template>

<style lang="scss">
*, *::before, *::after {
	box-sizing: border-box;
}

body {
	background: var(--canvas-color);
	color: #FFF;
	font-family: var(--main-font);
	margin: 0;
	min-width: var(--body-min-width);
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin-top: 0;

	&:last-child {
		margin-bottom: 0;
	}
}

button {
	&:hover {
		cursor: pointer;
	}
}
</style>