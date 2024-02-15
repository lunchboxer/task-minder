<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'

  export let data
  const { subject } = data
</script>

<Breadcrumbs crumbs={[{ name: 'Subjects', href: '/subjects' }, { name: subject?.name }]} />

<h1>Edit subject "{subject.name}"</h1>

<Form submitLabel="Update" successUrl="/subjects">
  <input type="hidden" name="id" value={subject?.id} />
  <SmartTextInput label="Name" data={subject} />
</Form>

<hr />

<a class="button" href="/subjects/{subject.id}/delete">Delete "{subject.name}"</a>
