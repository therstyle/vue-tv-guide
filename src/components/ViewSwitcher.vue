<script setup>
import {ref, computed, onMounted} from 'vue';

const status = ref(false);
const currentComponent = computed(() => status.value === true ? 'GridView' : 'FeatView');
const emit = defineEmits(['view-switched']);

const updateCurrentComponent = () => {
	emit('view-switched', currentComponent.value);

	window.scrollTo({
		behavior: 'smooth',
		top: 0
	});
}

const iconFeat = new URL(`../assets/images/feat-view.svg`, import.meta.url).href;
const iconGrid = new URL(`../assets/images/grid-view.svg`, import.meta.url).href;

const setFalse = () => {
	status.value = false;
	updateCurrentComponent();
}

const setTrue = () => {
	status.value = true;
	updateCurrentComponent();
}

onMounted(() => {
	updateCurrentComponent();
});
</script>

<template>
	<div class="view-switcher">
		<div class="view-switcher__body">
			<button @click="setFalse">
				<img :src="iconFeat" alt="Feat View">
			</button>

			<div class="view-switcher__toggle-body">
				<input 
					class="view-switcher__toggle" 
					type="checkbox" 
					v-model="status"
					@change="updateCurrentComponent"
				>
			</div>

			<button @click="setTrue">
				<img :src="iconGrid" alt="Grid View">
			</button>
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

	@include mobile {
		top: auto;
		bottom: 0;
	}

	&__body {
		display: flex;
		gap: 10px;
		padding: 10px;
		background: #333;
		min-width: 94px;
		border-radius: 0 0 5px 5px;
		box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.66);

		@include mobile {
			border-radius: 5px 5px 0 0;
			box-shadow: 0px -1px 4px 2px rgba(0,0,0,0.66);
		}

		button {
			background: none;
			border: none;
			margin: 0;
			padding: 0;
			display: block;
			width: 100%;
		}

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