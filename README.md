# Quick Notes App

A simple and lightweight Notes application built with **React (frontend)** and **Express (backend)**.  
It allows users to **add**, **view**, **edit**, and **delete** notes — all stored in-memory.

---

## Features

- Add new notes  
- Edit existing notes  
- Delete notes  
- Toggle “Show All Notes” and “Hide Notes” view  
- Instant updates without reload  
- CORS enabled for frontend-backend communication  

---

### Tech Stack
- React (Frontend)
- Node.js + Express (Backend)
- Axios (API Communication)
- CORS (Cross-Origin Access)

### Features
- Add, View, Delete Notes
- Simple UI and Fast Response

### How React communicates with Node.js
React uses **Axios** to send HTTP requests (GET, POST, DELETE) to the Node.js server. Node.js listens for these endpoints and responds with JSON data — completing the request-response lifecycle.

### REST APIs vs WebSockets
- **REST API** is one-way communication (request → response).
- **WebSocket** enables real-time, two-way communication.
Use REST for CRUD apps and WebSockets for chat/live updates.

### Node.js Event Loop
The event loop allows Node.js to handle multiple tasks asynchronously without blocking execution. It delegates tasks like I/O to background threads and continues running other code.

### Async Handling in React
Used **useState** for managing data and **useEffect** for fetching notes on mount. API calls are handled using async/await and axios.

## Folder Structure

```
quicknotes/
│
├── server/
│ ├── index.js
│ ├── package.json
│
├── client/
│ ├── src/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│
└── README.md
```
## Core Concept Questions with Answers:

### 1.Explain how React communicates with Node.js in your project.
React communicates with Node.js through **HTTP requests** using **Axios**.  
When a user performs an action (like add or delete), React sends a request to the backend API endpoint.  
Node.js (with Express) processes the request and sends back a response.  
This follows the **request-response lifecycle** of REST APIs.  
CORS is enabled on the backend to allow safe communication between different ports (3000 & 5000).

---

### 2.What is the difference between REST APIs and WebSockets? (When would you use each?)
**REST APIs** are stateless and work through request-response cycles (ideal for CRUD apps).  
**WebSockets** provide full-duplex, real-time communication between client and server.  
REST is used when data changes occasionally (like saving or deleting notes).  
WebSockets are used for live updates (like chats, games, or dashboards).  
In this app, REST is enough as data doesn’t need instant syncing.

---

### 3.Describe the role of the event loop in Node.js. (Why does Node.js remain non-blocking?)
The **event loop** manages asynchronous operations in Node.js.  
It allows Node to handle multiple requests concurrently without blocking the main thread.  
Tasks like file access or API calls are sent to background workers.  
Once completed, their callbacks are queued back for execution.  
This non-blocking model makes Node.js fast and scalable for I/O-heavy tasks.

---

### 4.How did you handle async calls or state updates in React?
I used React Hooks like **useState** and **useEffect** to manage state and async logic.  
`useEffect` triggers fetching notes when needed.  
Async functions (like Axios calls) handle server communication.  
State updates with `setNotes` ensure UI re-renders automatically.  
Errors and loading states are managed using separate state variables.

---

### 5.What could be improved to make this app production-ready?
Add a **database** (like MongoDB) for persistent note storage.  
Implement **user authentication** to secure notes per user.  
Add **input validation** and better **error handling**.  
Use **environment variables** for API URLs and ports.  
Add logging, testing, and deploy the app using services like AWS or Vercel.

---


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)