import asyncio
import json
import websockets
import random
import string

chatrooms = {}


def generateChatroomId():
    return ''.join(random.choice(string.ascii_lowercase) for i in range(10))


async def chat(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        action = data.get('action')
        chatroomId = data.get('chatroomId')
        content = data.get('content')

        if action == 'create':
            newChatroomId = generateChatroomId()
            newChatroom = {'id': newChatroomId, 'clients': set()}
            chatrooms[newChatroomId] = newChatroom
            await websocket.send(json.dumps({'action': 'created', 'chatroomId': newChatroomId}))
        elif action == 'list':
            chatroomList = list(chatrooms.keys())
            await websocket.send(json.dumps({'action': 'listed', 'chatrooms': chatroomList}))
        elif action == 'join':
            chatroom = chatrooms.get(chatroomId)
            if chatroom:
                chatroom['clients'].add(websocket)
                await websocket.send(json.dumps({'action': 'joined', 'chatroomId': chatroomId}))
        elif action == 'message':
            currentChatroom = chatrooms.get(chatroomId)
            if currentChatroom:
                for client in currentChatroom['clients']:
                    await client.send(json.dumps({'action': 'message', 'chatroomId': chatroomId, 'content': content}))


start_server = websockets.serve(chat, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)

print('Server started on port 8080')

asyncio.get_event_loop().run_forever()
