<script>
  import { Fa } from 'svelte-fa'
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

  export let value = ''
  export let errors = ''
  export let label = ''
  export let type = 'text'
  export let constraints = {}

  let showPassword = false

  function showHidePassword() {
    showPassword = !showPassword
  }

  $: name = label
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .toLowerCase()
</script>

<label for={name} class:error={!!errors}>{label}</label>
{#if type === 'password'}
  {#if showPassword}
    <input
      {name}
      type="text"
      class="password"
      bind:value
      class:error={!!errors}
      aria-invalid={!!errors}
      {...constraints}
    />
  {:else}
    <input
      {name}
      class="password"
      type="password"
      bind:value
      class:error={!!errors}
      aria-invalid={!!errors}
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
    {name}
    type="text"
    bind:value
    class:error={!!errors}
    aria-invalid={errors ? 'true' : 'false'}
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
