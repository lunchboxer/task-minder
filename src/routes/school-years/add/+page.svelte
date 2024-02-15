<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
</script>

<Breadcrumbs
  crumbs={[
    { href: '/school-years', name: 'School years' },
    { href: '/school-years/add', name: 'Add' },
  ]}
/>

<h1>Add a school year</h1>
<Form submitLabel="Add" successUrl="/school-years">
  <SmartTextInput label="Name" />
  <SmartTextInput label="Start date" type="date" />
  <SmartTextInput label="End date" type="date" />
</Form>
