const WebSocket = require('ws');
// Why express? no clue. asked AI for a framework to serve the server, this was
// suggested
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle new connections
wss.on('connection', (ws) => {
  // Handle messages
  ws.on('message', (message) => {
    // Send all received messages back
    wss.clients.forEach((client) => {
      // Validate state of socket
      if (client.readyState === WebSocket.OPEN) {
        // I actually fucking hate this. Use rust. or python. 
        // or any other language not javascript. plz. i beg. plz.
        client.send(JSON.stringify(message));  
      }
    });
  });
});

// Open our server on port 8081
server.listen(8081, () => {
  console.log('WebSocket server started on port 8081');
});
