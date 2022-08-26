import loading from '../state/loading';
import shows from '../state/shows';
import currentShowID from '../state/currentShowID';
import channels from '../state/channels';
import timeSlots from '../state/timeslots';

const loadShows = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	loading.value = true;

	if (data) {
		shows.value = data;
		
		const firstTimeSlot = timeSlots.value[0];

		for (const channel in channels.value) {
			if (channels.value[channel].shows.find(show => show.start === firstTimeSlot)) {
				const firstShow = channels.value[channel].shows.find(show => show.start === firstTimeSlot);
				currentShowID.value = firstShow.id;
			}
		}
	}

	loading.value = false;
};

export default loadShows;