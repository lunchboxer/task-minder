<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
</script>

<Breadcrumbs crumbs={[{ href: '/students', name: 'Students' }, { name: 'Add' }]} />

<h1>Add a Student</h1>

<Form
  submitLabel="Create student"
  successMessage="Student created successfully"
  successUrl="/students"
>
  <SmartTextInput label="Name" />
</Form>
