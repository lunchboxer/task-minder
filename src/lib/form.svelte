<script>
  import { notifications } from '$lib/notifications'
  import Error from '$lib/Error.svelte'
  import { dev } from '$app/environment'
  import Fa from 'svelte-fa'
  import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

  let form

  let restart = 1
  let errors = ''
  let disabled = false
  let loading = false
  export let action = ''
  export let method = 'POST'
  export let submitLabel = 'Submit'
  export let onSubmit = () => {}
  export let onReset = () => {}
  export let onError = () => {
    notifications.add({ type: 'error', text: 'Something went wrong.' })
  }

  const submit = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'error',
      })
      return
    }
    loading = true
    disabled = true
    ++restart
    try {
      onSubmit()
      errors = ''
      form && form.reset() // component may have unmounted by this time
    } catch (error) {
      dev && console.error(error)
      errors = error
      onError(error)
    } finally {
      disabled = false
      loading = false
    }
  }

  const reset = () => {
    ++restart
    onReset()
    errors = ''
    form.reset()
    form.setAttribute('isValid', true)
  }
</script>

<Error {errors} />

<form
  bind:this={form}
  on:submit|preventDefault={submit}
  on:reset|preventDefault={reset}
  {action}
  {method}
>
  <fieldset {disabled}>
    {#key restart}
      <slot />
    {/key}
    <p>
      <button type="reset" class="btn btn-outline gap-2" {disabled}>
        <Fa icon={faXmark} />reset
      </button>
      <button
        type="submit"
        class:loading
        class="btn btn-success gap-2"
        {disabled}
      >
        <Fa icon={faCheck} />{submitLabel}
      </button>
    </p>
  </fieldset>
</form>
