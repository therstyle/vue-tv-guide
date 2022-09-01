<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import ViewSwitcher from './components/ViewSwitcher.vue';
import {currentComponent, components} from './state/components';
import shows from './state/shows';
import channelsSorted from './state/channelsSorted';
import currentShowID from './state/currentShowID';
import timeSlots from './state/timeslots';
import showPanelOpen from './state/showPanelOpen';
import today from './state/today';
import {visible} from './state/visible';
import updateCurrentShow from './setters/updateCurrentShow';
import closeShowPanel from './setters/closeShowPanel';
import addToVisible from './setters/addToVisible';
import removeFromVisible from './setters/removeFromVisible';
import loadShows from './utils/loadShows';

onMounted(() => {
	loadShows(`https://api.tvmaze.com/schedule?date=${today.value}`);
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
	<ViewSwitcher></ViewSwitcher>

	<component 
		:is="components[currentComponent]"
		:shows="shows"
		:currentShowID="currentShowID"
		:showPanelOpen="showPanelOpen"
		:timeSlots="timeSlots"
		:channels="channelsSorted"
		:currentComponent="currentComponent"
		:visible="visible"
		@change-current-show="updateCurrentShow"
		@close-show-panel="closeShowPanel"
		@add-to-visible="addToVisible"
		@remove-from-visible="removeFromVisible"
	>
	</component>
</template>

<style lang="scss">
@import './assets/css/global.scss';
</style>