const getShowByID = (shows, id, key) => {
	const show = shows.find(show => show.id === id);
	return show[key];
}

export default getShowByID;