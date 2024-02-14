<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
</script>

<h1>Add a school year</h1>

<Form submitLabel="Add" action="?/add">
  <SmartTextInput label="Name" />
  <SmartTextInput label="Start date" type="date" />
  <SmartTextInput label="End date" type="date" />
</Form>
