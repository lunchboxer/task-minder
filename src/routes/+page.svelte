<script>
  export let data
</script>

<h1>Welcome to Task Minder</h1>
<p>Track who is doing the assignments and when.</p>

<div class="card">
  <h2>School years</h2>
  {#if data.schoolYears?.length}
    <ul>
      {#each data.schoolYears as schoolYear}
        <li>{schoolYear.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No school years yet.</p>
  {/if}
  <a class="button" href="/school-years">Edit/View school years</a>
</div>

<div class="card">
  <h2>Groups</h2>
  {#if data.groups?.length}
    <ul>
      {#each data.groups as group}
        <li>{group.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No groups yet.</p>
  {/if}
  <a class="button" href="/groups">Edit/View groups</a>
</div>
