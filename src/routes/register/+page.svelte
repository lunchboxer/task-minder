<script>
  import { superForm } from 'sveltekit-superforms/client'
  import Password from '$lib/password.svelte'

  export let data

  const { form, enhance, errors, reset } = superForm(data.form)
</script>

<div class="center-card">
  <h1>Register</h1>

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
      <fieldset class:invalid={$errors.name}>
        <label for="name">Name</label>
        <input name="name" type="text" bind:value={$form.name} aria-invalid="true" />
        <p class="error">
          {#if $errors.name}
            ! {$errors.name}
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
    <p>Already have an account? <a href="/login">Log in</a></p>
    <div class="button-group">
      <input type="reset" />
      <input type="submit" value="Register" />
    </div>
  </form>
</div>
