<script>
  import { Fa } from 'svelte-fa'
  import { faUser, faClose } from '@fortawesome/free-solid-svg-icons'
  import { page } from '$app/stores'

  export let me
  let show = false

  const showMenu = () => {
    show = true
  }
  const hideMenu = () => {
    show = false
  }
</script>

<svelte:window on:click={hideMenu} />

{#if me}
  <div class="dropdown">
    {#if show}
      <button on:click|stopPropagation={hideMenu} class="active">
        <Fa icon={faClose} />
      </button>
    {:else}
      <button on:click|stopPropagation={showMenu}>
        <Fa icon={faUser} />
      </button>
    {/if}
    <ul class="dropdown-content" class:show>
      <li><span>Logged in as {me.name || me.username}</span></li>
      {#if $page.url.pathname !== '/logout'}
        <li>
          <a href="/logout">Logout</a>
        </li>
      {/if}
      {#if $page.url.pathname !== '/profile'}
        <li>
          <a href="/profile">User Profile</a>
        </li>
      {/if}
    </ul>
  </div>
{/if}

<style>
  button {
    all: unset;
    cursor: pointer;
    padding: 1rem;
  }

  .dropdown {
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 3rem;
    right: 0;
    padding: 0;
    min-width: 150px;
    background-color: var(--contrast-bg-color);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  @media (min-width: 576px) {
    .dropdown-content {
      top: 2.5rem;
    }
  }

  .dropdown-content.show {
    display: block;
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li a,
  li span {
    display: block;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  li a:hover {
    background-color: var(--contrast-bg-color);
  }
</style>
