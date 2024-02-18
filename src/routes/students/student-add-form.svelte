<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
</script>

<h2>Add a Student</h2>

<Form
  submitLabel="Create student"
  successMessage="Student created successfully"
  successUrl="/students"
  action="?/create"
>
  <TextInput label="Name" />
</Form>
