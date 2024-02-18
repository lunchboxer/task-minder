<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/groups', name: 'Groups' }, { name: 'Add' }]} />

<h1>Add a Group</h1>

<Form submitLabel="Create group" action="?/create" successMessage="Group created successfully">
  <TextInput label="Name" />
  <TextInput label="Grade" />
</Form>
