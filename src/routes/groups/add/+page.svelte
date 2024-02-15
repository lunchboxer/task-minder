<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/groups', name: 'Groups' }, { name: 'Add' }]} />

<h1>Add a Group</h1>

<Form submitLabel="Create group" successMessage="Group created successfully">
  <SmartTextInput label="Name" />
  <SmartTextInput label="Grade" />
</Form>
