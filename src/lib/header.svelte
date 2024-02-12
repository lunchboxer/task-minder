<script>
  import { Fa } from 'svelte-fa'
  import { faListCheck, faUser } from '@fortawesome/free-solid-svg-icons'

  export let me
  console.log(me)
</script>

<header>
  <a href="/" class="title">
    <h1>
      <Fa icon={faListCheck} pull="left" translateY={0.1} />
      <span class="title">Task Minder</span>
    </h1>
  </a>
  <div class="right">
    {#if me}
      <div class="dropdown">
        <button class="dropbtn">
          <Fa icon={faUser} />
        </button>
        <ul class="dropdown-content">
          <li>Logged in as {me.name || me.username}</li>
          <li>
            <a href="/logout">Log out</a>
          </li>
          <li>
            <a href="/profile">User profile</a>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</header>

<style>
  button.dropbtn {
    all: unset;
  }
  header {
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }

  .dropdown {
    overflow: hidden;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    top: 3rem;
    right: 0;
    padding: 0.5rem;
    min-width: 150px;
    background-color: var(--contrastier-bg-color);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown-content li {
    list-style: none;
    padding: 1rem;
    margin: 0;
  }
</style>
