<script setup>
import { toRefs } from 'vue';
import MainGrid from './MainGrid.vue';
import ChannelListing from './ChannelListing.vue';
import FeatShows from './FeatShows.vue';

const props = defineProps({
	shows: Array,
	currentShowID: Number,
	showPanelOpen: Boolean,
	timeSlots: Array,
	channels: Object,
	currentComponent: String
});

const {
	shows, 
	currentShowID, 
	showPanelOpen, 
	timeSlots, 
	channels
} = toRefs(props);
</script>

<template>
	<MainGrid :currentComponent="currentComponent">
		<ChannelListing :channels="channels"></ChannelListing>

		<FeatShows 
			:channels="channels"
			:shows="shows"
		></FeatShows>
	</MainGrid>
</template>