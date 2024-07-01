<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Sheet from "../../lib/components/ui/sheet/index";
  import { UserOptions } from "../(components)/";

  let windowWidth = window.innerWidth;
  let clicked = false;

  function handleResize() {
    windowWidth = window.innerWidth;
    if (windowWidth >= 1024) clicked = false;
  }
</script>

<svelte:window on:resize={handleResize} />
<nav class={"navbar"}>
  <div class="border-solid border-2 border-gray-300 m-6">
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="link" class="p-1 m-1">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left" class="z-[1000]">
        <UserOptions />
      </Sheet.Content>
    </Sheet.Root>
  </div>
</nav>

<style>
  .navbar {
    @apply fixed top-0 w-full h-20 bg-gray-200 z-[999] flex flex-row items-center transition-all duration-200 ease-out;
  }

  @media (max-width: 1024px) {
    .navbar {
      @apply h-[4.5em] w-screen text-white flex flex-col items-center justify-start;
    }
    .navbar-clicked {
      @apply h-screen w-screen text-white flex flex-col items-center justify-start;
    }
  }
</style>
