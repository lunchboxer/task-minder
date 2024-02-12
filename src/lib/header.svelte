<script>
  import { Fa } from 'svelte-fa'
  import { faListCheck, faUser } from '@fortawesome/free-solid-svg-icons'

  export let me
</script>

<header>
  <h1>
    <Fa icon={faListCheck} pull="left" translateY={0.1} />
    <span class="title">Task Minder</span>
  </h1>
  <div class="right">
    {#if me}
      <Fa icon={faUser} />
    {/if}
  </div>
</header>
