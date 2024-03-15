const WebSocket = require("ws");
const express = require("express");

const app = express();

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', client => {
    client.on('message', message => {
        wss.clients.forEach(ws => {
            if (ws !== client && ws.readyState === WebSocket.OPEN) {
                ws.send(message);
            }
        });
    });
});

const server = app.listen(3002, () => {
    console.log('Server started on port 3002.');
    console.log('WebSocket server running on port 3001.');
});
