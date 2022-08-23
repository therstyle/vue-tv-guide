<script setup>
import {toRefs} from 'vue';
import MainGrid from './MainGrid.vue';
import ChannelListing from './ChannelListing.vue';
import FeatShows from './FeatShows.vue';

const props = defineProps({
	shows: Array,
	currentShowID: Number,
	showPanelOpen: Boolean,
	timeSlots: Array,
	channels: Object,
	currentComponent: String,
	visible: String
});

const emit = defineEmits(['add-to-visible', 'remove-from-visible']);

const addToVisible = (value) => {
	emit('add-to-visible', value);
}

const removeFromVisible = (value) => {
	emit('remove-from-visible', value);
}

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
		<ChannelListing 
			:channels="channels"
			:visible="visible"
		></ChannelListing>

		<FeatShows 
			:channels="channels"
			:shows="shows"
			@add-to-visible="addToVisible"
			@remove-from-visible="removeFromVisible"
		></FeatShows>
	</MainGrid>
</template>