<script>
  export let errors = ''
  const getMessage = (errors) => {
    if (!errors) return false
    return Array.isArray(errors)
      ? errors.map((error) => error.message).join('\n')
      : (errors && errors.message) || errors
  }
</script>

{#if getMessage(errors)}
  <p class="alert error">
    <span class="error-message"><strong>Error:</strong>&nbsp;{getMessage(errors)}</span>
  </p>
{/if}
