<script setup>
	import {ref, onMounted} from 'vue';

	const props = defineProps({
		channelID: String
	});

	const element = ref(null);
	const emit = defineEmits(['add-to-visible', 'remove-from-visible']);

	const observerOptions = {
		rootMargin: '-50% 0% -50% 0%',
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				emit('add-to-visible', props.channelID);
			}
			else {
				emit('remove-from-visible', props.channelID);
			}
		});
	}, observerOptions);

	onMounted(() => {
		observer.observe(element.value);
	});
</script>

<template>
	<div ref="element" :id="`channel-${props.channelID}`" class="feat-shows__channel">
		<a :name="`channel-${props.channelID}`"></a>
		<slot></slot>
	</div>
</template>