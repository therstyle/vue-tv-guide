<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import {DateTime} from 'luxon';
import MainGrid from './components/MainGrid.vue';
import ChannelPreview from './components/ChannelPreview.vue';
import TimeListing from './components/TimeListing.vue';
import ChannelListing from './components/ChannelListing.vue';
import ShowListing from './components/ShowListing.vue';
import shows from './state/shows';
import channels from './state/channels';
import currentShowID from './state/currentShowID';
import timeSlots from './state/timeslots';
import showPanelOpen from './state/showPanelOpen';
import loadShows from './utils/loadShows';
import toNumber from './utils/toNumber';

const updateCurrentShow = (value) => {
	currentShowID.value = value;
	showPanelOpen.value = !showPanelOpen.value;
}

const closeShowPanel = () => {
	showPanelOpen.value = false;
}

onMounted(() => {
	loadShows('https://api.tvmaze.com/schedule');
});

watch(showPanelOpen, (newShowPanelOpen) => {
	if (newShowPanelOpen) {
		document.body.classList.add('panel-open');
	}
	else {
		document.body.classList.remove('panel-open');
	}
});
</script>

<template>
	<MainGrid>
		<ChannelPreview
			:shows="shows"
			:currentShowID="currentShowID"
			:showPanelOpen="showPanelOpen"
			@close-show-panel="closeShowPanel"
		>
		</ChannelPreview>

		<TimeListing 
			:timeSlots="timeSlots"
		></TimeListing>

		<ChannelListing
			:channels="channels"
		></ChannelListing>

		<ShowListing 
			:shows="shows"
			:channels="channels"
			@change-current-show="updateCurrentShow"
		></ShowListing>
	</MainGrid>
</template>

<style lang="scss">
@import './assets/css/global.scss';
</style>