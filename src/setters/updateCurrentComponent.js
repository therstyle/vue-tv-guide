import {currentComponent} from '../state/components';

const updateCurrentComponent = (value) => {
	currentComponent.value = value;
}

export default updateCurrentComponent;