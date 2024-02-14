<script>
  import { enhance } from '$app/forms'
  import { notifications } from '$lib/notifications'
  import { goto, invalidateAll } from '$app/navigation'
  import { Fa } from 'svelte-fa'
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

  export let submitLabel = 'Submit'
  export let resetLabel = 'Reset'
  export let method = 'post'
  export let successMessage = 'Form processed successfully'
  export let successUrl = ''

  let formComponent
  let restart = 1
  let loading = false

  const reset = () => {
    ++restart
    formComponent.reset()
    // form = {}
    formComponent.setAttribute('isValid', true)
    invalidateAll()
  }

  const action = () => {
    loading = true
    return async ({ result, update }) => {
      loading = false
      await update()
      if (result.type === 'failure') {
        notifications.add({
          type: 'error',
          text: 'Form submission failed. Please try again.',
        })
      } else if (result.type === 'success') {
        notifications.add({
          type: 'success',
          text: successMessage,
        })
        if (successUrl) goto(successUrl)
        // should probably run invalidate all here
        // maybe it runs automatically
      }
    }
  }
</script>

<div class="container">
  <form {method} use:enhance={action} on:reset={reset} bind:this={formComponent}>
    {#key restart}
      <slot />
    {/key}
    <div class="button-group">
      <input type="reset" value={resetLabel} />
      <input type="submit" value={submitLabel} />
    </div>
  </form>
  {#if loading}
    <div class="overlay">
      <p>Loading</p>
      <div class="spinner">
        <Fa icon={faCircleNotch} spin />
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    position: relative;
  }
  .overlay {
    color: var(--primary-color);
    font-size: 1.4rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0.7;
    background-color: var(--background-color);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
