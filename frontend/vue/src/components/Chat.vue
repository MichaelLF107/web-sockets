<script setup lang="ts">
import { reactive, ref } from 'vue';

import type { Message } from '../types/message';

const props = defineProps<{
  selectedRoom?: string;
  messages: Message[];
  sendMessage: (message: string, user: string) => void;
}>();

const state = reactive({
  message: '',
  user: '',
});

const nameInputRef = ref<HTMLInputElement | null>(null);

function handleSendMessage() {
  props.sendMessage(state.message, state.user);
  state.message = '';
}
</script>

<template>
<div v-if="props.selectedRoom && state.user !==''" class="chat">
  <div class="messages">
    <div v-for="(message, index) in props.messages" :key="index" class="message">
      <div v-if="message.user === state.user" class="userMessage">
        <span>🧑‍💻 {{ message.user }} -</span>
        <span>{{ message.message }}</span>
      </div>
      <div v-else class="otherMessage">
        <span>🧑‍💻 {{ message.user }} -</span>
        <span>{{ message.message }}</span>
      </div>
    </div>
  </div>
  <div class="messageContainer">
    <input
      type="text"
      v-model="state.message"
      class="messageInput"
    />
    <button @click="handleSendMessage()">Send</button>
  </div>
</div>

<div v-else-if="state.user === ''" class="nameInputContainer">
  <input type="text" placeholder="Enter your name" ref="nameInputRef" />
  <button @click="state.user = nameInputRef?.value ?? ''">Join</button>
</div>

<div v-if="!props.selectedRoom">
  <span>Select a room</span>
</div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}

.messages {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 1rem;
  overflow-y: auto;
  margin-top: 2.5rem;
  gap: 1rem;
}

.message {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.userMessage {
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

.otherMessage {
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

.nameInputContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #646cff;
  border: 1px solid #eee;
}

.messageContainer {
  display: flex;
  align-items: center;
  width: 100%;
}

.messageInput {
  flex-grow: 1;
  margin-left: 1rem;
}

</style>