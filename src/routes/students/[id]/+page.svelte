<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'

  export let data
  const { student } = data
</script>

<Breadcrumbs crumbs={[{ href: '/students', name: 'Students' }, { name: 'Add' }]} />

<h1>Edit student</h1>

<Form submitLabel="Update" successUrl="/students" successMessage="Student record updated">
  <input type="hidden" name="id" value={student.id} />
  <SmartTextInput label="Name" data={student} />
</Form>

<hr />

<a class="button" href="{student.id}/delete">Delete {student.name}</a>
