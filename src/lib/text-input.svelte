<script>
  import { Fa } from 'svelte-fa'
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
  import { camelCase } from '$lib/utils'

  export let value = ''
  export let errors = ''
  export let label = ''
  export let type = 'text'
  export let constraints = {}
  export let autocomplete = 'off'

  let showPassword = false

  function showHidePassword() {
    showPassword = !showPassword
  }

  const id = camelCase(label)
</script>

<label for={id} class:error={!!errors}>{label}</label>
{#if type === 'password'}
  {#if showPassword}
    <input
      {id}
      {autocomplete}
      name={id}
      type="text"
      class="password"
      {value}
      class:error={!!errors}
      aria-invalid={errors ? 'true' : undefined}
      {...constraints}
    />
  {:else}
    <input
      {id}
      name={id}
      {autocomplete}
      class="password"
      type="password"
      {value}
      class:error={!!errors}
      aria-invalid={errors ? 'true' : undefined}
      {...constraints}
    />
  {/if}

  <span class="show-hide">
    <span
      tabindex="0"
      role="switch"
      aria-checked={showPassword}
      aria-describedby="password"
      class="reset"
      on:click={showHidePassword}
      on:keydown={(event) => event.key === 'Enter' && showHidePassword()}
    >
      <Fa icon={showPassword ? faEyeSlash : faEye} class="inline" />
    </span>
  </span>
{:else}
  <input
    name={id}
    {id}
    {autocomplete}
    type="text"
    {value}
    class:error={!!errors}
    aria-invalid={errors ? 'true' : undefined}
    {...constraints}
  />
{/if}
<p class="error">
  {#if errors}
    ! {errors}
  {:else}
    &nbsp;
  {/if}
</p>

<style>
  .show-hide {
    cursor: pointer;
    margin-left: -2.3rem;
  }
</style>
