const toID = value => {
	value = value.replaceAll(' ', '_');
	value = value.toLowerCase();
	return value;
}

export default toID;