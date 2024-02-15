<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/subjects', name: 'Subjects' }, { name: 'Add' }]} />

<h1>Add subject</h1>

<Form
  submitLabel="Create subject"
  successMessage="Subject added successfully"
  successUrl="/subjects"
>
  <SmartTextInput label="Name" />
</Form>
