<script>
  import { enhance } from '$app/forms'
  import TextInput from '$lib/text-input.svelte'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  export let form

  $: if (form?.success) {
    const returnTo = $page?.url?.searchParams?.get('returnTo')
    notifications.add({
      type: 'success',
      text: 'Login successful',
    })
    goto(returnTo || '/')
  }

  const getRegisterPath = () => {
    const returnTo = $page?.url?.searchParams?.get('returnTo')
    return returnTo ? `/register?returnTo=${returnTo}` : '/register'
  }
</script>

<div class="center-card">
  <h1>Login required</h1>
  <form method="POST" use:enhance>
    <TextInput
      value={form?.username}
      errors={form?.errors?.username}
      label="Username"
      autocomplete="username"
    />
    <TextInput
      value={form?.password}
      type="password"
      label="Password"
      autocomplete="current-password"
      errors={form?.errors?.password}
    />
    <p>
      Don't have an account? <a href={getRegisterPath()}> Register </a>
    </p>
    <div class="button-group">
      <input type="reset" />
      <input type="submit" value="Log in" />
    </div>
  </form>
</div>
