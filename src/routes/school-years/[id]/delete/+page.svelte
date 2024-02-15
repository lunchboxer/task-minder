<script>
  import DeleteThing from '$lib/delete-thing.svelte'
  export let data
  const { schoolYearId, schoolYears } = data

  const schoolYear = schoolYears?.find((year) => year.id === schoolYearId)
</script>

<DeleteThing thing={schoolYear} thingName="school year" />
