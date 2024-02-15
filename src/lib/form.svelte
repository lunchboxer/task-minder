<script>
  import { enhance } from '$app/forms'
  import { notifications } from '$lib/notifications'
  import { goto, invalidateAll } from '$app/navigation'
  import { Fa } from 'svelte-fa'
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  import Error from './error.svelte'

  export let submitLabel = 'Submit'
  export let resetLabel = 'Reset'
  export let method = 'post'
  export let successMessage = 'Form processed successfully'
  export let successUrl = ''
  export let action = ''

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
        // invalidateAll()
      }
    }
  }
</script>

<div class="container">
  <Error {errors} />
  <form
    {method}
    use:enhance={submitHandler}
    {action}
    on:reset|preventDefault={reset}
    bind:this={formComponent}
  >
    {#key restart}
      <slot />
    {/key}
    <div class="button-group">
      <slot name="buttons">
        <input type="reset" value={resetLabel} />
        <input type="submit" value={submitLabel} />
      </slot>
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
