<script>
  import Breadcrumbs from '$lib/breadcrumbs.svelte'
  import SchoolYearAddForm from './school-year-add-form.svelte'
  export let data
</script>

<Breadcrumbs crumbs={[{ name: 'School years' }]} />

<h1>School years</h1>
{#if data.schoolYears}
  {#each data.schoolYears as schoolYear}
    <p>
      <a href="/school-years/{schoolYear.id}">"{schoolYear.name}"</a> : {schoolYear.startDate} to {schoolYear.endDate}
    </p>
  {/each}
{/if}

<SchoolYearAddForm />
