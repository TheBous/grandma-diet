<script lang="ts">
	import AuthCheck from "$lib/components/AuthCheck.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";
	import { t } from "$lib/i18n/translations";
	import type { PageData } from "./$types";

	export let data: PageData;

	let userMessage = "";
	let loading = false;
	let aiMessage = "";

	console.warn($t("common.highProtein"));

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
	<div class="form-control flex flex-row">
		<Checkbox
			label={$t("common.highProtein")}
			checked
			onChange={console.warn}
		/>
		<Checkbox
			label={$t("common.highProtein")}
			checked
			onChange={console.warn}
		/>
		<Checkbox
			label={$t("common.highProtein")}
			checked
			onChange={console.warn}
		/>
	</div>

	<button class="btn btn-primary" on:click={onMessage}>Ask something</button>
	{#if loading}
		<span class="loading loading-dots loading-lg my-4" />
	{/if}
	{#if !loading}
		<span>{aiMessage}</span>
	{/if}
</AuthCheck>
