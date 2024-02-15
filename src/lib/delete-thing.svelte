<script>
  import Form from '$lib/form.svelte'
  import Breadcrumbs from '$lib/breadcrumbs.svelte'

  export let thing = {}
  export let thingName = '' // e.g. "student"
  export let parentName = capitalize(thingName) + 's' // e.g. "Students"
  export let parentUrl = `/${toKebabCase(thingName)}s` // e.g. "/students"

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function toKebabCase(string) {
    return string.replaceAll(/\s+/g, '-').toLowerCase()
  }
</script>

<Breadcrumbs
  crumbs={[
    { name: parentName, href: parentUrl },
    { href: parentUrl + '/' + thing.id, name: thing?.name },
    { name: 'Delete' },
  ]}
/>
<h1>Delete {thingName}</h1>

<h2>{thing?.name}</h2>

<Form successUrl={parentUrl} successMessage="{capitalize(thingName)} Deleted">
  <p>Are you sure you want to delete this {thingName}?</p>
  <input type="hidden" name="id" value={thing.id} />
  <div slot="buttons">
    <a href="{parentUrl}/{thing.id}" class="button">No, go back.</a>
    <button type="submit">I'm sure. Delete {thingName}.</button>
  </div>
</Form>
