<script>
  import { goto } from '$app/navigation'

  const reset = () => {
    goto('/')
  }
</script>

<div class="center-card">
  <h1>Log out</h1>
  <p>We are going to miss you.</p>
  <form method="POST" on:reset={reset}>
    <input type="reset" value="Nevermind" />
    <input type="submit" value="Get me out of here" />
  </form>
</div>
