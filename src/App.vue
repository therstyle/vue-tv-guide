<script setup>
import {ref, onMounted, computed} from 'vue';
import vars from './assets/css/vars.scss';
import MainGrid from './components/MainGrid.vue';
import ChannelPreview from './components/ChannelPreview.vue';
import TimeListing from './components/TimeListing.vue';
import ChannelListing from './components/ChannelListing.vue';
import ShowListing from './components/ShowListing.vue';

const shows = ref([]);
const loading = ref(false);
const currentShowID = ref(0);

const channels = computed(() => {
	const channelObj = {};
	let keyName;

	shows.value.forEach(show => {
		if (!show?.show?.network?.name) {return};

		const channelName = show?.show.network.name;
		keyName = channelName.replace(' ', '_');
		keyName = keyName.toLowerCase();

		//create a temporary object to hold values
		if (!channelObj.hasOwnProperty(keyName)) { //check if the key exists, to prevent overwrite of existing keys
			channelObj[keyName] = {
				label: channelName,
				id: show.show.network.id,
				logo: `${keyName}.svg`,
				shows: []
			};
		}

		const showObj = {
			id: show.id
		}

		//loop thru temp object to add shows to matching channels
		for (const channel in channelObj) {
			if (channelObj[channel].label === channelName) {
				channelObj[channel].shows.push(showObj);
			}
		}
	});

	return channelObj;
});

const timeSlots = computed(() => {
	const temp = [];
	let time;

	shows.value.forEach(show => {
		if (!show?.show?.schedule?.time) {return;}

		const time = show.show.schedule.time;
		const timeConverted = time.split(':');
		const hours = parseInt(timeConverted[0]);
		const minutes = timeConverted[1];
		const timeLabel = hours >= 12 ? 'pm' : 'am';
		const hoursConverted = hours >= 13 ? hours - 12 : hours;
		const timeString = `${hoursConverted}:${minutes}${timeLabel}`;

		temp.push(timeString);
	});

	const unique = [...new Set(temp)];
	return unique;
});

const loadShows = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	loading.value = true;

	if (data) {
		shows.value = data;
		currentShowID.value = shows.value[0].id;
	}

	loading.value = false;
};

const updateCurrentShow = (value) => {
	currentShowID.value = value;
}

onMounted(() => {
	loadShows('https://api.tvmaze.com/schedule');
});
</script>

<template>
	<MainGrid>
		<ChannelPreview
			:shows="shows"
			:currentShowID="currentShowID"
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

<style lang="scss">
*, *::before, *::after {
	box-sizing: border-box;
}

body {
	background: var(--canvas-color);
	color: #FFF;
	font-family: var(--main-font);
	margin: 0;
	min-width: var(--body-min-width);
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin-top: 0;

	&:last-child {
		margin-bottom: 0;
	}
}

img {
	max-width: 100%;
}

button {
	&:hover {
		cursor: pointer;
	}
}
</style>