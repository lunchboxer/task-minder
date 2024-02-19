<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
  import Select from '$lib/select.svelte'
  import { page } from '$app/stores'
</script>

<h2>Add a Student</h2>

<Form
  submitLabel="Create student"
  successMessage="Student created successfully"
  successUrl="/students"
  action="?/create"
>
  <TextInput label="Name" />
  <Select
    label="Group"
    name="groupId"
    options={$page?.data?.groups.map((g) => ({ label: g.name, value: g.id }))}
  />
</Form>
