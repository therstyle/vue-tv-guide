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
	--top-gap: 64px;

	@include mobile {
		--top-gap: 32px;
	}

	display: inline-flex;
	gap: 16px;
	font-size: 14px;
	justify-content: center;
	align-items: center;
	text-shadow: none;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: #FFF;
	padding: 12px 36px;
	text-decoration: none;
	margin-top: var(--top-gap);
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.75);
	transition: var(--transition-duration) all ease-in-out;
	border: 1px solid rgba(255, 255, 255, 0.50);
	background: #ff7b0d; /* Old browsers */
	background: -moz-linear-gradient(left,  #ff7b0d 0%, #ffa84c 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left,  #ff7b0d 0%,#ffa84c 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right,  #ff7b0d 0%,#ffa84c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

	&:hover {
		box-shadow: 0px 0 16px 0 rgba(219, 140, 50, 0.66);
	}
}
</style>