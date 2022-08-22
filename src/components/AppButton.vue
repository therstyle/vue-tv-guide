<script setup>
	const props = defineProps({
		href: String,
		target: String
	})
</script>

<template>
	<a class="app-button" :href="props.href" :target="props.target">
		<slot></slot>
	</a>
</template>

<style lang="scss">
@import '../assets/css/vars';

.app-button {
	display: inline-flex;
	gap: 16px;
	justify-content: center;
	align-items: center;
	text-shadow: none;
	font-weight: bold;
	color: #FFF;
	background: orange;
	padding: 16px 64px;
	border-radius: 32px;
	text-decoration: none;
	margin-top: 64px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75);
	transition: var(--transition-duration) all ease-in-out;
	border: 3px solid rgba(255, 255, 255, 0.50);

	&:hover {
		box-shadow: 2px 2px 16px 10px rgba(219, 140, 50, 0.66);
	}
}
</style>