import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import styles from './App.module.css'
import Chat from './components/Chat';
import type { Message } from './types';

function App() {
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);
  const [rooms, setRooms] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.action === 'listed') {
        setRooms(data.chatrooms);
      } else if (data.action === 'message') {
        setMessages((messages) => [data.content, ...messages]);
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };

  }, []);

  useEffect(() => {
    if (selectedRoom) {
      ws?.send(JSON.stringify({
        action: 'join',
        chatroomId: selectedRoom,
      }));
    }
  }, [selectedRoom, ws]);

  function listRooms() {
    ws?.send(JSON.stringify({
      action: 'list',
    }));
  }

  function createRoom() {
    ws?.send(JSON.stringify({
      action: 'create',
    }));
  }

  function sendMessage(message: string, user: string) {
    ws?.send(JSON.stringify({
      action: 'message',
      chatroomId: selectedRoom,
      content: {
        user,
        message,
      }
    }));
  }

  return (
    <main className={styles.main}>
      <Navbar roomList={rooms} listRooms={listRooms} createRoom={createRoom} selectRoom={setSelectedRoom} />
      <Chat selectedRoom={selectedRoom} messages={messages} sendMessage={sendMessage} />
    </main>
  )
}

export default App
