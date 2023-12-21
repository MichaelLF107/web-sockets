<script setup lang="ts">
import { reactive } from "vue";
import Navbar from "./components/Navbar.vue";
import Chat from "./components/Chat.vue";

import type { Message } from "./types/message";

const state = reactive({
  roomList: [] as string[],
  messages: [] as Message[],
  selectedRoom: "",
});

const socket = new WebSocket("ws://localhost:8080/ws");

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.action === "listed") {
    state.roomList = data.chatrooms;
  } else if (data.action === "message") {
    state.messages = [data.content, ...state.messages];
  }
};

function listRooms() {
  socket?.send(
    JSON.stringify({
      action: "list",
    })
  );
}

function createRoom() {
  socket?.send(
    JSON.stringify({
      action: "create",
    })
  );
}

function sendMessage(message: string, user: string) {
  socket?.send(
    JSON.stringify({
      action: "message",
      chatroomId: state.selectedRoom,
      content: {
        user,
        message,
      },
    })
  );
}

function selectRoom(room: string) {
  state.selectedRoom = room;
  socket?.send(
    JSON.stringify({
      action: "join",
      chatroomId: room,
    })
  );
}
</script>

<template>
  <Navbar
    :roomList="state.roomList"
    :listRooms="listRooms"
    :createRoom="createRoom"
    :joinRoom="selectRoom"
  />
  <Chat
    :selectedRoom="state.selectedRoom"
    :messages="state.messages"
    :sendMessage="sendMessage"
  />
</template>

<style scoped></style>
