import {ref, computed} from 'vue';
import {currentComponent} from './components';

const allVisible = ref(new Set());
const visible = computed(() => {
	const arr = Array.from(allVisible.value);
	const output = currentComponent.value === 'FeatView' ? arr[0] : null;

	return output;
}); 

export {allVisible, visible};