<script lang="ts">
  import type { Message } from "../types/message";

  export let messages: Message[] = [];
  export let user: string;
  export let sendMessage: (message: string, user: string) => void;

  let message: string;
</script>

<div class="chat">
  <div class="messages">
    {#each messages as message}
      {#if message.user === user}
        <div class="user-message">
          <div class="message-user">
            🧑‍💻 {message.user} -
          </div>
          <div class="message-content">
            {message.message}
          </div>
        </div>
      {:else}
        <div class="other-message">
          <div class="message-user">
            🧑‍💻 {message.user} -
          </div>
          <div class="message-content">
            {message.message}
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <div class="input-container">
    <input
      type="text"
      placeholder="Type a message..."
      class="message-input"
      bind:value={message}
      on:keydown={(event) => {
        if (event.key === "Enter") {
          sendMessage(message, user);
          message = "";
        }
      }}
    />
    <button on:click={() => {
      sendMessage(message, user);
      message = "";
    }}>Send</button>
  </div>
</div>

<style>
  .chat {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100vw - 4rem);
    justify-content: space-between;
    margin-bottom: 3.5rem;
  }

  .messages {
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    padding: 1rem;
    overflow-y: auto;
    margin-top: 4rem;
    gap: 1rem;
    width: calc(100vw - 5rem);
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 5rem;
  }

  .user-message {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #353535;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ffffff;
    min-width: 15%;
    max-width: 75%;
    word-break: break-all;
  }

  .other-message {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #353535;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ffffff;
    min-width: 15%;
    max-width: 75%;
    word-break: break-all;
  }

  .message-input {
    flex-grow: 1;
    margin-left: 1rem;
  }
</style>