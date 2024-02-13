<script>
  import { fly } from 'svelte/transition'
  import NotificationItem from './notification-item.svelte'
  import { notifications } from './data'
</script>

{#if $notifications}
  <div class="notification-list">
    {#each Object.entries($notifications) as [id, message] (id)}
      <div transition:fly={{ x: 400, duration: 200 }}>
        <NotificationItem {message} {id} />
      </div>
    {/each}
  </div>
{/if}

<style>
  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: fixed;
    bottom: 0.4rem;
    right: 0.4rem;
    z-index: 1000;
    max-width: 300px;
  }
</style>
