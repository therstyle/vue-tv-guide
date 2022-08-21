<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import GridView from './components/GridView.vue';
import FeatView from './components/FeatView.vue';
import ViewSwitcher from './components/ViewSwitcher.vue';
import shows from './state/shows';
import channels from './state/channels';
import currentShowID from './state/currentShowID';
import timeSlots from './state/timeslots';
import showPanelOpen from './state/showPanelOpen';
import loadShows from './utils/loadShows';
import toNumber from './utils/toNumber';

const currentComponent = ref(null);

const updateCurrentShow = (value) => {
	currentShowID.value = value;
	showPanelOpen.value = !showPanelOpen.value;
}

const closeShowPanel = () => {
	showPanelOpen.value = false;
}

const updateCurrentComponent = (value) => {
	currentComponent.value = value;
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
	<ViewSwitcher
	@view-switched="updateCurrentComponent"
	>
	</ViewSwitcher>

	<GridView
		:shows="shows"
		:channels="channels"
		:currentShowID="currentShowID"
		:timeSlots="timeSlots"
		:showPanelOpen="showPanelOpen"
		@close-show-panel="closeShowPanel"
		@change-current-show="updateCurrentShow"
	>
	</GridView>
</template>

<style lang="scss">
@import './assets/css/global.scss';
</style>