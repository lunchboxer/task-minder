<script>
  import '../app.css'
  import Header from '$lib/header.svelte'
  import Footer from '$lib/footer.svelte'
</script>

<svelte:head>
  <title>Task Minder</title>
</svelte:head>

<Header />

<main>
  <slot />
</main>

<Footer />
