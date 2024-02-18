<script>
  import TrayIcon from '$lib/icons/tray-icon.svelte'
  export let me
  export let checked
</script>

<header class="navbar w-full lg:hidden bg-base-200 z-50 sticky top-0 shadow-sm">
  <div class="navbar-start">
    {#if me?.id}
      <label
        class="btn btn-circle btn-ghost lg:hidden swap swap-rotate"
        for="drawer"
        aria-label="open sidebar"
      >
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" bind:checked />

        <!-- hamburger icon -->
        <svg
          class="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
        >
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          />
        </svg>
      </label>
    {/if}
  </div>
  <div class="navbar-center">
    <a href="/" class="btn btn-ghost text-primary text-xl lg:hidden">
      <TrayIcon size="24" />
      Submitted
    </a>
  </div>
  <div class="navbar-end"></div>
</header>
