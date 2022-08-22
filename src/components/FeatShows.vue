<script setup>
import FeatShowChannel from './FeatShowChannel.vue';
import FeatShow from './FeatShow.vue';

const props = defineProps({
	channels: Object,
	shows: Array
});
</script>

<template>
	<section class="feat-shows">
		<FeatShowChannel 
			v-for="(channel, index) in channels" 
			:key="index"
			:channelID="channel.fileName"
		>
			<FeatShow 
				v-for="(show, index) in channel.shows" 
				:key="index"
				:show="show"
				:shows="shows"
			></FeatShow>
		</FeatShowChannel>
	</section>
</template>

<style lang="scss">
@import '../assets/css/vars';

.feat-shows {
	grid-row-start: 1;
	grid-column: 1/3;
	display: flex;
	flex-direction: column;
}
</style>