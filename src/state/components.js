import {ref} from 'vue';
import GridView from '../components/GridView.vue';
import FeatView from '../components/FeatView.vue';

const value = sessionStorage.getItem('currentView');
const currentComponent = ref(value !== undefined && value !== null ? value : 'FeatView');
const components = {
	GridView,
	FeatView
}

export {currentComponent, components};