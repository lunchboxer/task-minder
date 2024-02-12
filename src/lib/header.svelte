<script>
  import { Fa } from 'svelte-fa'
  import { faListCheck } from '@fortawesome/free-solid-svg-icons'
  import UserMenu from './user-menu.svelte'

  export let me
</script>

<header>
  <a href="/" class="title">
    <h1>
      <Fa icon={faListCheck} pull="left" translateY={0.1} />
      <span class="title">Task Minder</span>
    </h1>
  </a>
  <div class="right">
    <UserMenu {me} />
  </div>
</header>

<style>
  header {
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }
</style>
