<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import DeleteModal from '$lib/delete-modal.svelte'

  export let data
  const { student } = data
</script>

<Breadcrumbs crumbs={[{ href: '/students', name: 'Students' }, { name: student?.name }]} />

<h1>Edit student</h1>

<Form
  action="?/update"
  submitLabel="Update"
  successUrl="/students"
  successMessage="Student record updated"
>
  <input type="hidden" name="id" value={student?.id} />
  <TextInput label="Name" data={student} />
</Form>

<hr />

<DeleteModal thing={student} thingName="student" />
