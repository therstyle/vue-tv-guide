import {computed} from 'vue';
import {DateTime} from 'luxon';
import shows from './shows';
import timeSlots from './timeslots';
import toNumber from '../utils/toNumber';

const channels = computed(() => {
	const channelObj = {};
	const firstTimeSlot = timeSlots.value[0];
	const lastTimeSlot = timeSlots.value[timeSlots.value.length - 1];
	let keyName;

	shows.value.forEach(show => {
		if (!show?.show?.network?.name) {return};

		const channelName = show.show.network.name;
		keyName = channelName.replace(' ', '_');
		keyName = keyName.toLowerCase();

		//create a temporary object to hold values
		if (!channelObj.hasOwnProperty(keyName)) { //check if the key exists, to prevent overwrite of existing keys
			channelObj[keyName] = {
				label: channelName,
				id: show.show.network.id,
				fileName: keyName,
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

					//Add empty show blocks for shows not available from API
					if (nextShow && timeSlot.mEnd && timeSlot.mEnd !== nextShow.mStart) {
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

				//Sort shows by time then find first show
				channelObj[channel].shows = channelObj[channel].shows.sort((a, b) => a.sort > b.sort ? 1 : -1);

				const firstShow = channelObj[channel].shows[0];

				//Add empty show block if first show is after first time slot
				if (firstShow && firstTimeSlot && firstShow.start !== firstTimeSlot && channelObj[channel].count === 0) {
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
					emptyShow.duration = diff?.values?.minutes;
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

export default channels;