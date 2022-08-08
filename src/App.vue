<script setup>
import {ref, onMounted, computed} from 'vue';
import {DateTime} from 'luxon';
import vars from './assets/css/vars.scss';
import MainGrid from './components/MainGrid.vue';
import ChannelPreview from './components/ChannelPreview.vue';
import TimeListing from './components/TimeListing.vue';
import ChannelListing from './components/ChannelListing.vue';
import ShowListing from './components/ShowListing.vue';
import toNumber from './utils/toNumber';

const shows = ref([]);
const loading = ref(false);
const currentShowID = ref(0);

const channels = computed(() => {
	const channelObj = {};
	const firstTimeSlot = timeSlots.value[0];
	const lastTimeSlot = timeSlots.value[timeSlots.value.length - 1];
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
				shows: [],
				empty: [],
				allShows: [],
				count: 0
			};
		}
		
		const startDate = DateTime.fromISO(`${show.airdate}T${show.airtime}`);
		const endDate = startDate.plus({minutes: show.show.runtime});

		const showObj = {
			id: show.id,
			date: show.airdate,
			duration: show.show.runtime,
			start: startDate.toLocaleString(DateTime.TIME_SIMPLE),
			mStart: show.airtime,
			end: endDate.toLocaleString(DateTime.TIME_SIMPLE),
			mEnd: endDate.toLocaleString(DateTime.TIME_24_SIMPLE),
			sort: toNumber(show.airtime)
		}

		//loop thru temp object to add shows to matching channels
		for (const channel in channelObj) {
			if (channelObj[channel].label === channelName) {
				channelObj[channel].shows.push(showObj);

				channelObj[channel].shows.forEach(timeSlot => {
					const index = channelObj[channel].shows.indexOf(timeSlot);
					const lastShow = channelObj[channel].shows[channelObj[channel].shows.length - 1];
					const prevShow = channelObj[channel].shows[index - 1];
					const nextShow = channelObj[channel].shows[index + 1];
					let duplicate = false;

					if (nextShow && timeSlot.mEnd !== nextShow.mStart) {
						const emptyShow = {
							name: 'unknown',
							start: timeSlot.end,
							mStart: timeSlot.mEnd,
							end: nextShow.start,
							mEnd: nextShow.mStart,
							sort: toNumber(timeSlot.mEnd)
						};

						const emptyStartDate = DateTime.fromISO(`${timeSlot.date}T${timeSlot.mEnd}`);
						const emptyEndDate = DateTime.fromISO(`${nextShow.date}T${nextShow.mStart}`);
						const diff = emptyEndDate.diff(emptyStartDate, 'minutes');

						// console.log(`${channel} - emptyStartDate = ${emptyStartDate}`);
						// console.log(`${channel} - emptyEndDate = ${emptyEndDate}`);

						channelObj[channel].empty.forEach(show => {
							if (show.mStart === emptyShow.mStart) {
								duplicate = true;
							}
						});

						emptyShow.duration = diff.values.minutes;

						//Remove duplicates and gaps less than 30 mins
						if (duplicate || emptyShow.duration < 30) {return};
						channelObj[channel].empty.push(emptyShow);
					}
				});

				const firstShow = channelObj[channel].shows[0];

				if (firstShow && firstShow.start !== firstTimeSlot && channelObj[channel].count === 0) {
					channelObj[channel].count++;

					const emptyShow = {
						name: 'unknown(firstshow)',
						start: firstTimeSlot,
						end: firstShow.start,
						mEnd: firstShow.mStart,
						sort: toNumber(firstTimeSlot)
					}

					const emptyStartString = `${firstShow.date} ${firstTimeSlot}`;
					const emptyStartDate = DateTime.fromFormat(emptyStartString, 'yyyy-LL-dd h:mm a');
					const emptyEndDate = DateTime.fromISO(`${firstShow.date}T${firstShow.mStart}`);
					const emptyMStart = emptyStartDate.toLocaleString(DateTime.TIME_24_SIMPLE);
					const diff = emptyEndDate.diff(emptyStartDate, 'minutes');

					emptyShow.mStart = emptyMStart;
					emptyShow.duration = diff.values.minutes;
					channelObj[channel].empty.push(emptyShow);
				}
			}

			const allShowsTemp = [...channelObj[channel].shows, ...channelObj[channel].empty];
			const allShowsSorted = allShowsTemp.sort((a, b) => a.sort > b.sort ? 1 : -1);
			
			channelObj[channel].allShows = allShowsSorted;
		}
	});

	return channelObj;
});

const timeSlots = computed(() => {
	const convertedTemp = [];
	const output = [];
	let time;

	shows.value.forEach(show => {
		if (!show?.airdate && !show?.airtime) {return;}

		const startDate = DateTime.fromISO(`${show.airdate}T${show.airtime}`);
		const simpleTime = startDate.toLocaleString(DateTime.TIME_SIMPLE);

		convertedTemp.push(startDate);
	});

	const uniqueConverted = [...new Set(convertedTemp)];

	const firstSlot = uniqueConverted[0];
	const lastSlot = uniqueConverted[uniqueConverted.length - 1];

	if (firstSlot !== undefined && lastSlot !== undefined) {
		const hoursDiff = lastSlot.diff(firstSlot, 'hours');
		console.log(hoursDiff);
		const loopAmount = hoursDiff.values.hours;
		const minutes = 60;

		for (let i = 0; i <= loopAmount; i++) {
			const timeString = firstSlot.plus({minutes: minutes * i});
			output.push(timeString.toLocaleString(DateTime.TIME_SIMPLE));
		}
	}

	return output;
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