<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
  import Select from '$lib/select.svelte'
  import { page } from '$app/stores'
</script>

<h2>Add a Group</h2>

<Form submitLabel="Create group" action="?/create" successMessage="Group created successfully">
  <TextInput label="Name" />
  <TextInput label="Grade" />
  <Select
    label="School Year"
    name="schoolYearId"
    options={$page?.data?.schoolYears.map((s) => ({ label: s.name, value: s.id }))}
    selected={$page?.data?.schoolYears[0]?.id}
  />
</Form>
