<script setup>
import {ref, computed, onMounted} from 'vue';

const status = ref(false);
const currentComponent = computed(() => status.value === true ? 'GridView' : 'FeatView');
const emit = defineEmits(['view-switched']);

const updateCurrentComponent = () => {
	emit('view-switched', currentComponent.value);
}

const iconFeat = new URL(`../assets/images/feat-view.svg`, import.meta.url).href;
const iconGrid = new URL(`../assets/images/grid-view.svg`, import.meta.url).href;

onMounted(() => {
	updateCurrentComponent();
});
</script>

<template>
	<div class="view-switcher">
		<div class="view-switcher__body">
			<img :src="iconFeat" alt="Feat View">

			<div class="view-switcher__toggle-body">
				<input 
					class="view-switcher__toggle" 
					type="checkbox" 
					v-model="status"
					@change="updateCurrentComponent"
				>
			</div>

			<img :src="iconGrid" alt="Grid View">
		</div>
	</div>
</template>

<style lang="scss">
@import '../assets/css/vars';

.view-switcher {
	--input-size: 10px;

	position: fixed;
	top: 0;
	right: 5vw;
	z-index: 3000;

	&__body {
		display: flex;
		gap: 10px;
		padding: 10px;
		background: #333;
		border-radius: 0 0 5px 5px;
		min-width: 94px;

		img {
			max-width: 12px;
			display: block;
		}
	}

	&__toggle {
		appearance: none;
		padding: 0;
		margin: 0;
		transition: var(--transition-duration) all ease-in-out;
		padding: 2px 5px;
		background: #000;
		border-radius: var(--input-size);
		width: calc(var(--input-size) * 3);
		display: block;
		height: 12px;

		&:checked {
			&::before {
				transform: translateX(100%);
			}
		}

		&::before {
			content: '';
			width: var(--input-size);
			height: var(--input-size);
			display: block;
			border-radius: 100%;
			background: #FFF;
			transition: var(--transition-duration) all ease-in-out;
		}
	}
}
</style>