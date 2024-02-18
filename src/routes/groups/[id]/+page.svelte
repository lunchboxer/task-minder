<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'

  export let data
  const { groupId, groups } = data
  const group = groups.find((group) => group.id === groupId)
</script>

<Breadcrumbs crumbs={[{ name: 'Groups', href: '/groups' }, { name: group?.name }]} />

<h1>Edit group "{group.name}"</h1>

<Form submitLabel="Update" action="?/update" successUrl="/groups">
  <input type="hidden" name="id" value={group?.id} />
  <TextInput label="Name" data={group} />
  <TextInput label="Grade" data={group} />
</Form>

<hr />

<a class="btn" href="/groups/{group.id}/delete">Delete "{group.name}"</a>
