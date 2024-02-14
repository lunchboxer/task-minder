<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
</script>

<h1>Add a group</h1>

<Form submitLabel="Create group" successMessage="Group created successfully">
  <SmartTextInput label="Name" />
</Form>
