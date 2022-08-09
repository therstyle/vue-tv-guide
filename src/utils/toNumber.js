const toNumber = (value) => {
	let newNum = value;
	newNum = newNum.replace(':', '');
	newNum = parseInt(newNum);

	return newNum;
}

export default toNumber;