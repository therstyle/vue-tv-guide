import {computed} from 'vue';
import {DateTime} from 'luxon';
import shows from './shows';
import today from './today';

const timeSlots = computed(() => {
	const convertedTemp = [];
	const output = [];

	shows.value.forEach(show => {
		if (!show?.airdate && !show?.airtime) {return}; //skip shows without the required values
		if (!show?.show?.network?.name) {return}; //skip shows without a network name because they won't have a channel
		if (show.airdate !== today.value) {return}; //skip shows that don't air today
		const startDate = DateTime.fromISO(`${show.airdate}T${show.airtime}`);
		
		convertedTemp.push(startDate);
	});

	const uniqueConverted = [...new Set(convertedTemp)];
	const firstSlot = uniqueConverted[0];
	const lastSlot = uniqueConverted[uniqueConverted.length - 1];

	if (firstSlot !== undefined && lastSlot !== undefined) {
		//Find shows that are in the last time slow
		const lastShows = shows.value.filter(show => {
			if (!show?.airdate && !show?.airtime) {return};

			const startSlotConverted = DateTime.fromISO(`${show.airdate}T${show.airtime}`).toLocaleString(DateTime.TIME_SIMPLE);
			const lastSlotConverted = lastSlot.toLocaleString(DateTime.TIME_SIMPLE);
	
			if (startSlotConverted === lastSlotConverted) {
				return show;
			}
		});

		//Find the highest duration of the last shows
		const lastShowDurations = lastShows.map(show => show.runtime);
		const highestDuration = Math.max.apply(Math, lastShowDurations);
		const newLastSlotString = DateTime.fromISO(`${lastShows[0].airdate}T${lastShows[0].airtime}`);
		const newLastSlot = newLastSlotString.plus({minutes: highestDuration});

		//Loop between the first time slot and the last time slot in 30 minute increments
		const hoursDiff = newLastSlot.diff(firstSlot, 'hours');
		let loopAmount = hoursDiff.values.hours * 2;
		loopAmount = Math.abs(loopAmount);
		loopAmount = Math.round(loopAmount);

		const minutes = 30;

		for (let i = 0; i <= loopAmount; i++) {
			const timeString = firstSlot.plus({minutes: minutes * i});
			output.push(timeString.toLocaleString(DateTime.TIME_SIMPLE));
		}
	}

	return output;
});

export default timeSlots;