<script>
  import { superForm } from 'sveltekit-superforms/client'
  import TextInput from '$lib/text-input.svelte'

  export let data

  const { form, enhance, errors, reset } = superForm(data.form)
</script>

<div class="center-card">
  <h1>Login required</h1>

  <form method="post" use:enhance on:reset={reset}>
    <TextInput
      bind:value={$form.username}
      errors={$errors.username}
      label="Username"
      autocomplete="username"
    />
    <TextInput
      type="password"
      label="Password"
      autocomplete="current-password"
      bind:value={$form.password}
      errors={$errors.password}
    />
    <p>Don't have an account? <a href="/register">Register</a></p>
    <div class="button-group">
      <input type="reset" />
      <input type="submit" value="Log in" />
    </div>
  </form>
</div>
