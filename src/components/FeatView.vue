<script setup>
import { toRefs } from 'vue';

const props = defineProps({
	shows: Array,
	currentShowID: Number,
	showPanelOpen: Boolean,
	timeSlots: Array,
	channels: Object
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
	<div></div>
</template>