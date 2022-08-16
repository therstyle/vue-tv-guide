<script setup>
const props = defineProps({
	channel: String
});
</script>

<template>
	<div class="show-listing__channel sub-grid" :data-channel="props.channel">
		<slot></slot>
	</div>
</template>