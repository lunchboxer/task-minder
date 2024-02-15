<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'

  export let data
  const { schoolYear } = data
</script>

<Breadcrumbs
  crumbs={[{ name: 'School years', href: '/school-years' }, { name: schoolYear?.name }]}
/>

<h1>Edit School Year</h1>

<Form submitLabel="Update" action="?/update" successUrl="/school-years">
  <input type="hidden" name="id" value={schoolYear?.id} />
  <SmartTextInput label="Name" data={schoolYear} />
  <SmartTextInput label="Start date" type="date" data={schoolYear} />
  <SmartTextInput label="End date" type="date" data={schoolYear} />
</Form>

<hr />

<a class="button" href="{schoolYear?.id}/delete">Delete "{schoolYear?.name}"</a>
