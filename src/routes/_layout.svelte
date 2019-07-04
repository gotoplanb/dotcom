<script>
	import Nav from '../components/Nav.svelte';

	let date = new Date;
	let year = date.getUTCFullYear();

	export let segment;
</script>

<style>
	main, footer {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<!-- TODO Add this back once there are more pages available <Nav {segment}/> -->

<main>
	<slot></slot>
</main>

<footer>
    <p>&copy; {year}</p>
</footer>