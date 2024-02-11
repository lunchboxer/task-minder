<script>
  import { Fa } from 'svelte-fa'
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

  export let value = ''
  export let errors
  export let constraints

  let showPassword = false
  function showHidePassword() {
    showPassword = !showPassword
  }
</script>

<label for="password"> Password </label>
{#if showPassword}
  <input class="password" bind:value name="password" type="text" />
{:else}
  <input
    class="password"
    bind:value
    aria-invalid={errors ? true : undefined}
    name="password"
    type="password"
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

<style>
  .show-hide {
    cursor: pointer;
    margin-left: -2.3rem;
  }
</style>
