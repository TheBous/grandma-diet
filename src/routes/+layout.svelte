<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->

<script lang="ts">
	import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
	import { user } from "$lib/firebase";
	import "../app.css";
	import { getRoutes } from "./routes";
	import img from "$lib/images/grandmadiet-horizontal-white.png";

	$: isUserLogged = !!$user?.uid;
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<ul class="p-2">
						{#each getRoutes(isUserLogged) as route (route.name)}
							<li><a href={route.path}>{route.name.toUpperCase()}</a></li>
						{/each}
					</ul>
				</li>
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl" href="/">
			<img src={img} alt="logo" width="150" /></a
		>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each getRoutes(isUserLogged) as route (route.name)}
				<li><a href={route.path}>{route.name.toUpperCase()}</a></li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle">
			<div class="indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/></svg
				>
				<span class="badge badge-xs badge-primary indicator-item" />
			</div>
		</button>
	</div>
</div>

<AnimatedRoute>
	<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoute>
