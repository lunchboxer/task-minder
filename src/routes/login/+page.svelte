<script>
  import { superForm } from 'sveltekit-superforms/client'
  import Password from '$lib/password.svelte'
  import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
  import { Fa } from 'svelte-fa'

  export let data

  const { form, enhance, errors, reset } = superForm(data.form)
</script>

<div class="card">
  <h1>Login required</h1>

  <form method="post" use:enhance on:reset={reset}>
    <div class="field-group">
      <fieldset class:invalid={$errors.username}>
        <label for="username">Username</label>
        <input name="username" type="text" bind:value={$form.username} aria-invalid="true" />
        <p class="error">
          {#if $errors.username}
            ! {$errors.username}
          {:else}
            &nbsp;
          {/if}
        </p>
      </fieldset>
      <fieldset class:invalid={$errors.password}>
        <Password bind:value={$form.password} errors={$errors.password} />
        <p class="error">
          {#if $errors.password}
            ! {$errors.password}
          {:else}
            &nbsp;
          {/if}
        </p>
      </fieldset>
    </div>
    <p>Don't have an account? <a href="/register">Register</a></p>
    <div class="button-group">
      <input type="reset" />
      <input type="submit" value="Log in" />
    </div>
  </form>
</div>

<style>
  .card {
    position: fixed;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
  }
</style>
