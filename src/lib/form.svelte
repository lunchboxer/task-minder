<script>
  import { enhance } from '$app/forms'
  import { notifications } from '$lib/notifications'
  import { goto, invalidateAll } from '$app/navigation'
  import Error from './error.svelte'

  export let submitLabel = 'Submit'
  export let resetLabel = 'Reset'
  export let method = 'post'
  export let successMessage = 'Form processed successfully'
  export let successUrl = ''
  export let action = ''
  export let onReset = () => {}
  export let onSuccess = () => {}

  let formComponent
  let restart = 1
  let loading = false
  let errors = ''

  const reset = async () => {
    ++restart
    errors = ''
    formComponent.reset()
    formComponent.setAttribute('isValid', true)
    invalidateAll()
    onReset()
  }

  const submitHandler = () => {
    errors = ''
    loading = true
    return async ({ result, update }) => {
      loading = false
      await update()
      if (result.type === 'failure') {
        notifications.add({
          type: 'error',
          text: 'Form submission failed. Please try again.',
        })
        if (result.data?.errors?.all) {
          errors = result.data.errors.all
        }
      } else if (result.type === 'success') {
        notifications.add({
          type: 'success',
          text: successMessage,
        })
        if (successUrl) goto(successUrl)
        onSuccess()
        // invalidateAll()
      }
    }
  }
</script>

<div class="container max-w-md">
  <Error {errors} />
  <form
    {method}
    use:enhance={submitHandler}
    {action}
    on:reset|preventDefault={reset}
    bind:this={formComponent}
  >
    <div class="form-items">
      {#key restart}
        <slot />
      {/key}
    </div>
    <div class="button-group justify-end flex flex-wrap py-4">
      <slot name="buttons">
        <input class="btn grow" type="reset" value={resetLabel} />
        <button class="btn btn-success grow" disabled={loading} type="submit">
          {#if loading}
            <span class="loading loading-spinner"></span>
            loading
          {:else}
            {submitLabel}
          {/if}
        </button>
      </slot>
    </div>
  </form>
</div>
