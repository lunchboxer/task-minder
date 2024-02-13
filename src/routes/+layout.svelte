<script>
  import '../app.css'
  import Header from '$lib/header.svelte'
  import Footer from '$lib/footer.svelte'
  import { NotificationList } from '$lib/notifications'

  export let data
  console.log(data)
</script>

<svelte:head>
  <title>Task Minder</title>
</svelte:head>

<Header me={data.me} />

<main>
  <slot />
</main>

<Footer />
<NotificationList />
