<script>
  import SmartTextInput from '$lib/smart-text-input.svelte'
  import { page } from '$app/stores'
  import Form from '$lib/form.svelte'

  const returnTo = $page?.url?.searchParams?.get('returnTo')

  const getRegisterPath = () => (returnTo ? `/register?returnTo=${returnTo}` : '/register')
</script>

<div class="center-card">
  <h1>Login required</h1>

  <Form submitLabel="Log in" successMessage="Login successful" successUrl={returnTo || '/'}>
    <SmartTextInput label="Username" autocomplete="username" />
    <SmartTextInput label="Password" type="password" autocomplete="current-password" />
    <p>
      Don't have an account? <a href={getRegisterPath()}> Register </a>
    </p>
  </Form>
</div>
