<script>
  import { Fa } from 'svelte-fa'
  import {
    faTriangleExclamation,
    faCircleCheck,
    faCircleExclamation,
  } from '@fortawesome/free-solid-svg-icons'
  import { notifications } from './data'
  export let message
  export let id

  $: text = !message || typeof message === 'string' ? message : message.text
  $: type = !message || typeof message === 'string' ? 'info' : message.type

  function remove() {
    notifications.remove(id)
  }
</script>

<div class="notification is-{type}">
  <button class="icon" on:click={remove}>
    <Fa
      icon={type === 'error'
        ? faTriangleExclamation
        : type === 'success'
          ? faCircleCheck
          : faCircleExclamation}
    />
  </button>
  <span class="text">{text}</span>
</div>

<style>
  .notification {
    display: flex;
    align-items: center;
    background-color: var(--contrastier-bg-color);
    border-radius: 0.5rem;
    min-height: 2rem;
    position: relative;
    color: var(--primary-color);
  }
  .icon {
    all: unset;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    text-align: center;
    font-weight: 800;
  }
  .text {
    padding: 0.5rem 1rem 0.5rem 0.5rem;
  }
  .is-success {
    color: var(--success-color);
  }
  .is-info {
    color: var(--primary-color);
  }
  .is-error {
    color: var(--error-color);
  }
</style>
