<script setup>
import ShowListingChannel from './ShowListingChannel.vue';
import Show from './Show.vue';
</script>

<template>
	<section class="show-listing">
			<ShowListingChannel channel="amc">
				<Show minutes="60">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="15">Placeholder</Show>
				<Show minutes="15">Placeholder</Show>
				<Show minutes="60">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="bet">
				<Show minutes="60">Placeholder</Show>
				<Show minutes="60">Placeholder</Show>
				<Show minutes="60">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="cbs">
				<Show minutes="30">Placeholder</Show>
				<Show minutes="75">Placeholder</Show>
				<Show minutes="15">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="cw">
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="fox">
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="ifc">
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
			</ShowListingChannel>

			<ShowListingChannel channel="espn">
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
				<Show minutes="30">Placeholder</Show>
			</ShowListingChannel>
		</section>
</template>

<style lang="scss" scoped>
.show-listing {
	grid-column-start: 2;
	grid-row-start: 2;
	display: grid;
	gap: var(--block-gap);
	transition: var(--transition-duration) all ease-in-out;
}
</style>