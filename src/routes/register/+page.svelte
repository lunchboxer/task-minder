<script>
  import { superForm } from 'sveltekit-superforms/client'
  import TextInput from '$lib/text-input.svelte'

  export let data

  const { form, enhance, errors, reset } = superForm(data.form)
</script>

<div class="center-card">
  <h1>Register</h1>

  <form method="post" use:enhance on:reset={reset}>
    <div class="field-group">
      <TextInput label="Username" bind:value={$form.username} errors={$errors.username} />
      <TextInput label="Name" bind:value={$form.name} errors={$errors.name} autocomplete="name" />
      <TextInput
        type="password"
        label="Password"
        bind:value={$form.password}
        errors={$errors.password}
      />
    </div>
    <p>Already have an account? <a href="/login">Log in</a></p>
    <div class="button-group">
      <input type="reset" />
      <input type="submit" value="Register" />
    </div>
  </form>
</div>
