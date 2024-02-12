<script>
  import NotificationItem from './NotificationItem.svelte'
  import { notifications } from './data'
</script>

{#if $notifications}
  <div class="toast toast-end">
    {#each Object.entries($notifications) as [id, message] (id)}
      <NotificationItem {message} />
    {/each}
  </div>
{/if}
