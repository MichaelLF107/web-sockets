<script lang="ts">
  import { onMount } from "svelte";

  export let rooms: string[] = [];
  export let listRooms: () => void;
  export let createRoom: () => void;
  export let joinRoom: (room: string) => void;

  let showDropdown = false;
  let dropdown: HTMLDivElement;
  let dropdownButton: HTMLButtonElement;

  onMount(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        showDropdown &&
        event.target !== dropdownButton
      ) {
        showDropdown = false;
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<nav class="navbar">
  {#if showDropdown}
    <div class="dropdown" bind:this={dropdown}>
      {#each rooms as room}
        <div class="dropdown-content">
          {room}
          <button
            class="join-button"
            on:click={() => {
              joinRoom(room);
              showDropdown = false;
            }}
          >
            Join
          </button>
        </div>
        {#if room !== rooms[rooms.length - 1]}
          <hr />
        {/if}
      {/each}
    </div>
  {/if}
  <button
    bind:this={dropdownButton}
    on:click={() => {
      listRooms();
      showDropdown = !showDropdown;
    }}
  >
    Rooms
  </button>
  <button on:click={createRoom}>Create Room</button>
</nav>

<style>
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: #2b2b2b;
  }

  .join-button {
    margin-right: 0;
  }

  .dropdown {
    position: absolute;
    top: 82px;
    left: 1em;
    padding: 1em;
    border: 1px solid #646cff;
    border-radius: 0.5em;
    background-color: #2b2b2b;
  }

  .dropdown-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
