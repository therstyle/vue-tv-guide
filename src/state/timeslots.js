import {computed} from 'vue';
import {DateTime} from 'luxon';
import shows from './shows';

const timeSlots = computed(() => {
	const convertedTemp = [];
	const output = [];

	shows.value.forEach(show => {
		if (!show?.airdate && !show?.airtime) {return;}
		const startDate = DateTime.fromISO(`${show.airdate}T${show.airtime}`);

		convertedTemp.push(startDate);
	});

	const startOfDay = DateTime.now().startOf('day');
	const endOfDay = startOfDay.plus({hours: 23, minutes: 30});
	convertedTemp.push(endOfDay);

	const uniqueConverted = [...new Set(convertedTemp)];
	const firstSlot = uniqueConverted[0];
	const lastSlot = uniqueConverted[uniqueConverted.length - 1];

	if (firstSlot !== undefined && lastSlot !== undefined) {
		const hoursDiff = lastSlot.diff(firstSlot, 'hours');
		const loopAmount = hoursDiff.values.hours * 2;
		const minutes = 30;

		for (let i = 0; i <= loopAmount; i++) {
			const timeString = firstSlot.plus({minutes: minutes * i});
			output.push(timeString.toLocaleString(DateTime.TIME_SIMPLE));
		}
	}

	return output;
});

export default timeSlots;