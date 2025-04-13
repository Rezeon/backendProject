const WebSocket = require('ws');

let sockets = [];

function initSocketServer(wss) {
    wss.on('connection', (ws) => {
        sockets.push(ws);
        console.log('Client connected via WS');

        ws.on('close', () => {
            sockets = sockets.filter(s => s !== ws);
            console.log('Client disconnected');
        });
    });
}

function broadcast(message) {
    sockets.forEach(socket => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    });
}

module.exports = {
    initSocketServer,
    broadcast
};
