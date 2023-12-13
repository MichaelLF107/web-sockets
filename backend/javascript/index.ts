import { WebSocketServer } from "ws";

interface Chatroom {
  id: string;
  clients: Set<WebSocket>;
}

const port = 8080;

const chatrooms: Map<string, Chatroom> = new Map();

const wss = new WebSocketServer({ port });

wss.on("connection", (ws: WebSocket) => {
  ws.addEventListener("message", (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    const { action, chatroomId, content } = data;
    console.log('received new message', data)

    switch (action) {
      case "create":
        const newChatroomId = generateChatroomId();
        const newChatroom: Chatroom = { id: newChatroomId, clients: new Set() };
        chatrooms.set(newChatroomId, newChatroom);
        ws.send(JSON.stringify({ action: "created", chatroomId: newChatroomId }));
        break;

      case "list":
        const chatroomList = Array.from(chatrooms.keys());
        ws.send(JSON.stringify({ action: "listed", chatrooms: chatroomList }));
        break;

      case "join":
        const chatroom = chatrooms.get(chatroomId);
        if (chatroom) {
          chatroom.clients.add(ws);
          ws.send(JSON.stringify({ action: "joined", chatroomId }));
        }
        break;

      case "message":
        const currentChatroom = chatrooms.get(chatroomId);
        if (currentChatroom) {
          currentChatroom.clients.forEach((client) => {
            client.send(
              JSON.stringify({ action: "message", chatroomId, content })
            );
          });
        }
        break;
    }
  });

  ws.addEventListener("close", () => {
    chatrooms.forEach((chatroom) => {
      chatroom.clients.delete(ws);
    });
  });
});

function generateChatroomId(): string {
  return Math.random().toString(36).substring(4, 36);
}

console.log(`Server started on port ${port}`);
