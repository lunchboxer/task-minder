<script>
  import { goto } from '$app/navigation'
  import { enhance } from '$app/forms'
  import { notifications } from '$lib/notifications'

  export let form

  const reset = () => {
    goto('/')
  }

  $: if (form?.success) {
    notifications.add({
      type: 'success',
      text: 'Logout successful',
    })
    reset()
  }
</script>

<div class="center-card">
  <h1>Log out</h1>
  <p>We are going to miss you.</p>
  <form method="POST" on:reset={reset} use:enhance>
    <input type="reset" value="Nevermind" />
    <input type="submit" value="Get me out of here" />
  </form>
</div>
