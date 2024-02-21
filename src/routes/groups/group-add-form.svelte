<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
</script>

<h2>Add a Group</h2>

<Form submitLabel="Create group" action="?/create" successMessage="Group created successfully">
  <TextInput label="Name" />
  <TextInput label="Grade" />
</Form>
