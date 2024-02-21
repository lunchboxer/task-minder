<script>
  export let data
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h2 class="h2">Welcome to Submitted.</h2>

    <!-- Animated Logo -->
    <figure>
      <section class="img-bg" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-inbox"
        ><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path
          d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        >
        </path>
      </svg>
    </figure>
    <!-- / -->
    <h3>Active school year</h3>
    <p>{data?.schoolYears?.find((sy) => sy.id === data.me.activeSchoolYear)?.name}</p>
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  figure svg,
  .img-bg {
    @apply w-56 h-56 md:w-80 md:h-80 text-primary;
  }
  .img-bg {
    @apply absolute z-[-1] rounded-full blur-[60px] transition-all;
    animation:
      pulse 25s cubic-bezier(0, 0, 0, 0.5) infinite,
      glow 28s linear infinite;
  }
  @keyframes glow {
    0% {
      @apply bg-primary;
    }
    50% {
      @apply bg-white;
    }
    100% {
      @apply bg-primary;
    }
  }
  @keyframes pulse {
    50% {
      transform: scale(0.3);
    }
  }
</style>
