<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Chat from "./lib/Chat.svelte";

  import type { Message } from "./types/message";

  let ws: WebSocket;
  let messages: Message[] = [];
  let rooms: string[] = [];
  let currentRoom: string;
  let selectedUser = false;
  let user: string;

  onMount(() => {
    ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("received message", data);
      if (data.action === "listed") {
        rooms = data.chatrooms;
      } else if (data.action === "message") {
        let newMessages = [...messages];
        newMessages.unshift(data.content);
        newMessages = newMessages.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        messages = newMessages;
      }
    };
  });

  function listRooms() {
    ws.send(JSON.stringify({ action: "list" }));
  }

  function createRoom() {
    ws.send(JSON.stringify({ action: "create" }));
  }

  function joinRoom(room: string) {
    currentRoom = room;
    ws.send(JSON.stringify({ action: "join", chatroomId: room }));
    messages = [];
  }

  function sendMessage(message: string, user: string) {
    ws.send(JSON.stringify({
      action: 'message',
      chatroomId: currentRoom,
      content: {
        user,
        message,
      }
    }));
  }
</script>

<main>
  <Navbar {rooms} {listRooms} {createRoom} {joinRoom} />
  {#if !currentRoom}
    <span>Choose a room</span>
  {:else if !selectedUser}
    <div class="user-modal">
      <input
        type="text"
        placeholder="Enter your name"
        bind:value={user}
      />
      <button on:click={() => selectedUser = true}>Join Chat</button>
    </div>
  {:else}
    <Chat {messages} {sendMessage} {user} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }

  .user-modal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 1rem;
    border: 1px solid #ff3e00aa;
    border-radius: 0.5em;
    background-color: #2b2b2b;
  }
</style>
