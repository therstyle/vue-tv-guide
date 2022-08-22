<script setup>
	const props = defineProps({
		channelID: String
	});
</script>

<template>
	<div :id="`channel-${props.channelID}`" class="feat-shows__channel">
		<a :name="`channel-${props.channelID}`"></a>
		<slot></slot>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';


</style>