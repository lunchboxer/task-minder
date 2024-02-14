<script>
  import { Fa } from 'svelte-fa'
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
  import { page } from '$app/stores'
  import { camelCase } from '$lib/utils'

  export let label = ''
  export let name = ''

  const id = name || camelCase(label)

  export let required = false
  export let error = ''
  export let type = 'text'
  export let constraints = {}
  export let autocomplete = 'off'

  let showPassword = false

  function showHidePassword() {
    showPassword = !showPassword
  }
</script>

<label for={id} class:error={$page?.form?.errors?.[id] || error}>{label}</label>
{#if type === 'password'}
  {#if showPassword}
    <input
      {id}
      {autocomplete}
      name={id}
      {type}
      class="password"
      {required}
      value={$page?.form?.[id] ?? ''}
      class:error={$page?.form?.errors?.[id] || error}
      aria-invalid={$page?.form?.errors?.[id] || error ? 'true' : undefined}
      {...constraints}
    />
  {:else}
    <input
      {id}
      name={id}
      {autocomplete}
      class="password"
      type="password"
      {required}
      value={$page?.form?.[id] ?? ''}
      class:error={$page?.form?.errors?.[id] || error}
      aria-invalid={$page?.form?.errors?.[id] || error ? 'true' : undefined}
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
    {type}
    {required}
    value={$page?.form?.[id] ?? ''}
    class:error={$page?.form?.errors?.[id] || error}
    aria-invalid={$page?.form?.errors?.[id] || error ? 'true' : undefined}
    {...constraints}
  />
{/if}
<p class="error">
  {#if $page?.form?.errors?.[id] || error}
    ! {$page?.form?.errors?.[id] || error}
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
