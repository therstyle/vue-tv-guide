import {allVisible} from '../state/visible';

const addToVisible = (value) => {
	allVisible.value.add(value);
}

export default addToVisible;