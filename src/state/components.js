import {ref, defineAsyncComponent} from 'vue';

const GridView = defineAsyncComponent(() => import('../components/GridView.vue'));
const FeatView = defineAsyncComponent(() => import('../components/FeatView.vue'));

const value = sessionStorage.getItem('currentView');
const currentComponent = ref(value !== undefined && value !== null ? value : 'FeatView');
const components = {
	GridView,
	FeatView
}

export {currentComponent, components};