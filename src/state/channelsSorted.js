import {computed} from 'vue';
import channels from './channels';

const channelsSorted = computed(() => {
	const sorted = Object.keys(channels.value)
		.sort()
		.reduce((accumulator, key) => {
			accumulator[key] = channels.value[key];

			return accumulator;
		}, {});

	return sorted;
});

export default channelsSorted;