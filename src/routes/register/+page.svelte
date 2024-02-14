<script>
  import Form from '$lib/form.svelte'
  import SmartTextInput from '$lib/smart-text-input.svelte'
  import { page } from '$app/stores'

  const returnTo = $page?.url?.searchParams?.get('returnTo')

  const getLoginPath = () => (returnTo ? `/login?returnTo=${returnTo}` : '/login')
</script>

<div class="center-card">
  <h1>Register</h1>

  <Form
    submitLabel="Register"
    successMessage="Registration successful"
    successUrl={returnTo || '/'}
  >
    <SmartTextInput label="Username" autocomplete="username" />
    <SmartTextInput label="Name" autocomplete="name" />
    <SmartTextInput type="password" label="Password" autocomplete="new-password" />

    <p>Already have an account? <a href={getLoginPath()}>Log in</a></p>
  </Form>
</div>
