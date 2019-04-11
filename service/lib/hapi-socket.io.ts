const pkg = require('../../package.json');
import * as SocketIO from 'socket.io';
import * as redisAdapter from 'socket.io-redis';

module.exports.plugin = {
    name: `${pkg.name}-socket.io`,
    version: '1.0.0',
    register: async function (server, options) {
        server.app.io = SocketIO(server.listener);
        server.app.io.adapter(redisAdapter(options));

        server.app.io.on('connection', function (socket) {
            console.log('socket connected', socket.id);
            socket.on('subscribe', function (room) {
                socket.join(room);
                console.log('socket subscribe', socket.id, room);
            });

            socket.on('unsubscribe', function (room) {
                socket.leave(room);
                console.log('socket unsubscribe', socket.id, room);
            });
        });

    }
};
