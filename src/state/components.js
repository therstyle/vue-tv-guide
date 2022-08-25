import {ref} from 'vue';
import GridView from '../components/GridView.vue';
import FeatView from '../components/FeatView.vue';

const currentComponent = ref('FeatView');
const components = {
	GridView,
	FeatView
}

export {currentComponent, components};