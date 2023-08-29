<script lang="ts">
	import AuthCheck from "$lib/components/AuthCheck.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let userMessage = "";
	let loading = false;
	let aiMessage = "";

	const onMessage = async () => {
		try {
			aiMessage = "";
			loading = true;
			const response = await fetch("/dashboard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages: [userMessage] }),
			});
			const json = await response.json();
			aiMessage = json?.message?.content ?? "";
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};
</script>

<AuthCheck>
	<input
		bind:value={userMessage}
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs my-4"
	/>
	<button class="btn btn-primary" on:click={onMessage}>Ask something</button>
	{#if loading}
		<span class="loading loading-dots loading-lg my-4" />
	{/if}
	{#if !loading}
		<span>{aiMessage}</span>
	{/if}
</AuthCheck>
