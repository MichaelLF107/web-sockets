## Web Sockets

This repository contains projects for a simple Chat application, built with React and Svelte on the frontend, Typescript and Python on the backend

## Requirements

 - Python 3
 - Latest version of [Bun](https://bun.sh/)

## Installation

1. Clone this repository
```bash
git clone https://github.com/MichaelLF107/web-sockets.git
```

2. Install each project's dependencies

For a frontend project. (eg. React):
```bash
cd frontend/react
bun install
```

For backend (Typescript):
```bash
cd backend/javascript
bun install
```

For backend (Python):
```bash
python3 -m pip install websockets
```

## Usage

1. Start the frontend development server (eg. React)
```bash
cd frontend/react
bun run dev
```

2. Start the backend server:

Typescript:
```bash
cd backend/javascript
bun run index.ts
```

Python
```bash
cd backend/python
python3 main.py
```

3. Open `http://localhost:5173/` on your browser

The websocket will be running on `http://localhost:8080/`
