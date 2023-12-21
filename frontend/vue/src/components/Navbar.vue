<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  roomList: string[];
  createRoom: () => void;
  joinRoom: (room: string) => void;
  listRooms: () => void;
}>();

const state = reactive({
  showRoomList: false,
});

const dropdownRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  if (
    dropdownRef.value && !dropdownRef.value.contains(event.target as Node) &&
    buttonRef.value && !buttonRef.value.contains(event.target as Node)
  ) {
    state.showRoomList = false;
  }
}

function openRoomList() {
  if (state.showRoomList) {
    state.showRoomList = false;
  } else {
    props.listRooms();
    state.showRoomList = true;
  }
}

function handleSelectRoom(room: string) {
  props.joinRoom(room);
  state.showRoomList = false;
}
</script>

<template>
  <nav class="navbar">
    <button class="dropdownButton" @click="openRoomList" ref="buttonRef">
      Rooms
      {{ state.showRoomList ? "▲" : "▼" }}
    </button>
    <button @click="createRoom">Create Room</button>
    <div v-if="state.showRoomList" class="dropdown" ref="dropdownRef">
      <div v-for="(room, index) in roomList" :key="index" class="room">
        {{ room }}
        <button @click="handleSelectRoom(room)" class="joinButton">Join</button>
      </div>
      <p v-if="roomList.length === 0">No rooms available</p>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
}

.dropdownButton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
}

.dropdown {
  position: absolute;
  top: 64px;
  left: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 8px;
  border: 1px solid #646cff;
  padding: 10px;
}

.hr {
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 10px 0;
  border: none;
}

.joinButton {
  border-color: #64ff67;
  color: #64ff67;
}
.joinButton:hover {
  color: white;
  border-color: white;
}
</style>
