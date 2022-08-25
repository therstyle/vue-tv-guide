import {allVisible} from '../state/visible';

const removeFromVisible = (value) => {
	allVisible.value.delete(value);
}

export default removeFromVisible;