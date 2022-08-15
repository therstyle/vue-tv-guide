import loading from '../state/loading';
import shows from '../state/shows';
import currentShowID from '../state/currentShowID';

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

export default loadShows;