<script>
  import DeleteThing from '$lib/delete-thing.svelte'
  export let data
  const { studentId, students } = data

  const student = students?.find((year) => year.id === studentId)
</script>

<DeleteThing thing={student} thingName="student" />
