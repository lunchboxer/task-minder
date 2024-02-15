<script>
  export let crumbs = []
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    {#each crumbs as crumb, index}
      <li>
        {#if index < crumbs.length - 1}
          <a href={crumb.href}>{crumb.name}</a>
        {:else}
          <span>{crumb.name}</span>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .breadcrumb {
    font-size: 0.9rem;
  }

  a {
    text-decoration: none;
  }

  .breadcrumb ul {
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
  }

  .breadcrumb li {
    display: inline;
    padding: 0;
    margin: 0;
  }

  .breadcrumb li + li:before {
    padding-right: 0.5rem;
    content: '/';
  }
</style>
