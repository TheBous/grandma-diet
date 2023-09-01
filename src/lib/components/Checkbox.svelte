<script>
	export let checked = false;
	export let disabled = false;
	export let label = "";
	export let onChange = () => {};
</script>

<label class="label cursor-pointer">
	<span class="label-text">{label}</span>
	<input
		on:change={onChange}
		type="checkbox"
		{checked}
		class="checkbox checkbox-primary"
		{disabled}
	/>
</label>
