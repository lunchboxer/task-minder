<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/subjects', name: 'Subjects' }, { name: 'Add' }]} />

<h1>Add subject</h1>

<Form
  submitLabel="Create subject"
  successMessage="Subject added successfully"
  successUrl="/subjects"
  action="?/create"
>
  <TextInput label="Name" />
</Form>
