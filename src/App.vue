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
import today from './state/today';
import loadShows from './utils/loadShows';
import toNumber from './utils/toNumber';

const currentComponent = ref('GridView');
const components = {
	GridView,
	FeatView
}

const allVisible = ref(new Set());
const visible = computed(() => {
	const arr = Array.from(allVisible.value);
	const output = currentComponent.value === 'FeatView' ? arr[0] : null;

	return output;
}); 

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

const addToVisible = (value) => {
	allVisible.value.add(value);
}

const removeFromVisible = (value) => {
	allVisible.value.delete(value);
}

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
	<ViewSwitcher
		@view-switched="updateCurrentComponent"
	>
	</ViewSwitcher>

	<component 
		:is="components[currentComponent]"
		:shows="shows"
		:currentShowID="currentShowID"
		:showPanelOpen="showPanelOpen"
		:timeSlots="timeSlots"
		:channels="channels"
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