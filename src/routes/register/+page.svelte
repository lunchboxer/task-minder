<script>
  import Form from '$lib/form.svelte'
  import TextInput from '$lib/text-input.svelte'
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
    <TextInput label="Username" autocomplete="username" />
    <TextInput label="Name" autocomplete="name" />
    <TextInput type="password" label="Password" autocomplete="new-password" />

    <p>Already have an account? <a href={getLoginPath()}>Log in</a></p>
  </Form>
</div>
