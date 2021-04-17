const express  = require('express');
const http = require('http');
const socketIO = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

let users = {};
let rooms = {
    '0000': {
        url: "//14.tvmovies.in/DI4npzQ8G1Dw/movie/43127",
        status: {
            title: "pause",
            time: 0
        },
        users: [],
    },
};

const serverMessage = (text) => {
    return {
        type: "server",
        name: "Server",
        text
    }
}

const sendToRoom = (socket ,room, type, data) => {
    socket.to(`room ${room}`).emit(type, data);
}

const creatRoom = () => {
    return {
        url: "//14.tvmovies.in/DI4npzQ8G1Dw/movie/43127",
        status: {
            title: "pause",
            time: 0
        },
        users: [],
    }
}

const userExitRoom = (id) => {

    const room = users[id].room;

    rooms[room].users = rooms[room].users.filter((user) => {return user.id !== id});

    sendToRoom(io, room, 'change_users', rooms[room].users);
}

io.sockets.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', (reason) => {
        console.log('user disconnected', reason);

        if (users[socket.conn.id] === undefined) return;

        const {name, room} = users[socket.conn.id];

        sendToRoom(io, room, 'message', serverMessage(`${name} покинул нас... :(`));

        delete users[socket.conn.id];
        rooms[room].users = rooms[room].users.filter((user) => {return user.id !== socket.conn.id});

        sendToRoom(io, room, 'change_users', rooms[room].users);
    });

    socket.on('change_url', (url) => {
        const {name, host, room} = users[socket.conn.id];

        if (!host) return;

        sendToRoom(io, room, 'message', serverMessage(`${name}, сменил видео!`));
        console.log("url: ", url);

        rooms[room].url = url;

        sendToRoom(io, room, 'change_url', url);
    });
	
	socket.on('reconnect', () => {
		 console.log("user reconnect");
    });

    socket.on('change_status', (status) => {
        const {name, host, room} = users[socket.conn.id];

        if (!host) return;

        sendToRoom(io, room, 'message', serverMessage(`${name} говорит ${status.title}`));

        console.log("status: ", status);
        rooms[room].status = status;

        sendToRoom(socket.broadcast, room, 'change_status', status);
    });

    socket.on('set_user_data', ({name, room}) => {

        if (rooms[room] === undefined) rooms[room] = creatRoom();

        if (users[socket.conn.id] !== undefined) userExitRoom(socket.conn.id);

        const hasHost = rooms[room].users.map( (user) => {return user.host} ).includes(true);

        users[socket.conn.id]= {name, room, host: !hasHost};
        rooms[room].users.push({id: socket.conn.id, name, host: !hasHost});
        rooms[room].countUser++;

        socket.join(`room ${room}`);

        console.log("Username: ", name, "| room: ", room);

        sendToRoom(io, room, 'message', serverMessage(`${name} Прибыл в комнату ${room}!`));
        sendToRoom(io, room, 'change_users', rooms[room].users);
        sendToRoom(io, room, 'change_url', rooms[room].url);
    });

    socket.on('message', (text) => {
		if (users[socket.conn.id] === undefined) return;
		
        const {name, room} = users[socket.conn.id];

        const message = {
            name,
            type: "user",
            text
        }

        console.log("user:",message.name, text);

        sendToRoom(io, room, 'message', message);
    });

});

app.get('/*', function (req, res) {
     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));