<script>
  import DeleteThing from '$lib/delete-thing.svelte'

  export let data
  const { subject } = data
</script>

<DeleteThing thing={subject} thingName="subject" />
