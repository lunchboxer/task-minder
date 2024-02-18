<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
</script>

<Breadcrumbs
  crumbs={[
    { href: '/school-years', name: 'School years' },
    { href: '/school-years/add', name: 'Add' },
  ]}
/>

<h1>Add a school year</h1>
<Form submitLabel="Add" successUrl="/school-years" action="?/create">
  <TextInput label="Name" />
  <TextInput label="Start date" type="date" />
  <TextInput label="End date" type="date" />
</Form>
