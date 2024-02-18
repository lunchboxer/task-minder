<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/students', name: 'Students' }, { name: 'Add' }]} />

<h1>Add a Student</h1>

<Form
  submitLabel="Create student"
  successMessage="Student created successfully"
  successUrl="/students"
  action="?/create"
>
  <TextInput label="Name" />
</Form>
