import loading from '../state/loading';
import shows from '../state/shows';
import currentShowID from '../state/currentShowID';
import channels from '../state/channels';

const loadShows = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	loading.value = true;

	if (data) {
		shows.value = data;
		
		const arr = Object.keys(channels.value).map(key => channels.value[key]);		
		currentShowID.value = arr[0].shows[0].id;
	}

	loading.value = false;
};

export default loadShows;