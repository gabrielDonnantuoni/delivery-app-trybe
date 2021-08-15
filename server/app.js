const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const next = require('next');
const socketio = require('socket.io');
const routes = require('./api/routes');
const { errorHandler } = require('./api/middlewares');
const socketEvents = require('./api/socketEvents');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

async function getServer() {
  try {
    await nextApp.prepare();
    const app = express();
    const server = http.createServer(app);
    const io = socketio(server);

    io.on('connection', (socket) => {
      socketEvents.orders(socket, io);
    });

    app.use(express.json());
    app.use(cors());
    app.use('/api', routes, errorHandler);

    app.all('*', (req, res) => nextHandler(req, res));

    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = getServer;
