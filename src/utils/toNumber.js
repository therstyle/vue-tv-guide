import today from '../state/today';
import {DateTime} from 'luxon';

const toNumber = (value) => {
	const dateString = `${today.value} ${value}`;
	const dateStamp = dateString.includes('AM') || dateString.includes('PM') ? DateTime.fromFormat(dateString, 'yyyy-LL-dd h:mm a') : DateTime.fromFormat(dateString, 'yyyy-LL-dd h:mm');
	const mTime = dateStamp.toLocaleString(DateTime.TIME_24_SIMPLE);
	const num = mTime.replace(':', '');

	return num;
}

export default toNumber;