import currentShowID from '../state/currentShowID';
import showPanelOpen from '../state/showPanelOpen';

const updateCurrentShow = (value) => {
	currentShowID.value = value;
	showPanelOpen.value = !showPanelOpen.value;
}

export default updateCurrentShow;