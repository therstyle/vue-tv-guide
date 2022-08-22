<script setup>
import { toRefs } from 'vue';
import MainGrid from './MainGrid.vue';
import ChannelPreview from './ChannelPreview.vue';
import TimeListing from './TimeListing.vue';
import ChannelListing from './ChannelListing.vue';
import ShowListing from './ShowListing.vue';

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

const emit = defineEmits(['close-show-panel', 'change-current-show']);

const closeShowPanel = (value) => {
	emit('close-show-panel', value);
}

const updateCurrentShow = (value) => {
	emit('change-current-show', value);
}
</script>

<template>
	<MainGrid :currentComponent="currentComponent">
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