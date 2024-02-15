<script>
  import DeleteThing from '$lib/delete-thing.svelte'

  export let data
  const { groups, groupId } = data

  const group = groups?.find((group) => group.id === groupId)
</script>

<DeleteThing thing={group} thingName="group" />
