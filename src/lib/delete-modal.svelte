<script>
  import Modal from '$lib/modal.svelte'
  import Form from '$lib/form.svelte'

  export let thing = {}
  export let thingName = '' // e.g. "student"
  export let parentUrl = thingName ? `/${toKebabCase(thingName)}s` : '/' // e.g. "/students"

  let modal

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function toKebabCase(string) {
    return string.replaceAll(/\s+/g, '-').toLowerCase()
  }

  const successMessage = `${capitalize(thingName)} "${thing.name}" Deleted`
</script>

<button class="btn" on:click={() => modal.showModal()}>Delete {thing.name || thingName}</button>

<Modal heading="Are you sure?" message="This action cannot be undone." bind:modal>
  <Form
    action="?/delete"
    successUrl={parentUrl}
    onReset={() => modal.close()}
    resetLabel="Cancel"
    submitLabel="Yes, delete {thing.name}"
    {successMessage}
    onSuccess={() => modal.close()}
  >
    <input type="hidden" name="id" value={thing.id} />
  </Form>
</Modal>
