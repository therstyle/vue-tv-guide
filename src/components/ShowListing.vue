<script setup></script>

<template>
	<section class="show-listing">
			<div class="show-listing__channel sub-grid" data-channel="Fox">
				<button class="show-listing__show" style="--minutes: 60;">Judge Alex</button>
				<button class="show-listing__show" style="--minutes: 30;">Divorce Court</button>
				<button class="show-listing__show" style="--minutes: 15;">Judge Mathis</button>
				<button class="show-listing__show" style="--minutes: 15;">Judge Mathis</button>
				<button class="show-listing__show" style="--minutes: 60;">Judge Mathis</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="cw">
				<button class="show-listing__show" style="--minutes: 60;">Jenny Jones</button>
				<button class="show-listing__show" style="--minutes: 60;">Jerry Springer</button>
				<button class="show-listing__show" style="--minutes: 60;">Maury</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="mtv">
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 75;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 15;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="fox-news">
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="e!">
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="bravo">
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
			</div>

			<div class="show-listing__channel sub-grid" data-channel="disney">
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
				<button class="show-listing__show" style="--minutes: 30;">Placeholder</button>
			</div>
		</section>
</template>

<style lang="scss" scoped>
.show-listing {
	grid-column-start: 2;
	grid-row-start: 2;
	display: grid;
	gap: var(--block-gap);
	transition: var(--transition-duration) all ease-in-out;

	&__show {
		--show-span: calc(var(--one-hour) * (var(--minutes) / 60)); //60 * 0.25

		padding: var(--block-padding);
		background: #ccc;
		text-align: left;
		border: none;
		grid-column: span var(--block-size);
		font-size: 24px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #FFF;
		height: 100px;
		border-radius: var(--block-corner-radius);
		display: flex;
		transition: var(--transition-duration) all ease-in-out;
		grid-column: span var(--show-span);

		&:hover {
			background: darken(#ccc, 10%);
		}
	}
}
</style>