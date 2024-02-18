<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'

  export let data
  const { groups } = data
</script>

<Breadcrumbs crumbs={[{ name: 'Groups' }]} />

<h1>Groups</h1>

{#if groups?.length}
  <ul>
    {#each groups as group}
      <li>
        <a href="/groups/{group.id}">{group.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No groups yet.</p>
{/if}

<a class="btn" href="/groups/add">Add group</a>
