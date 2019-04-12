const pkg = require('../../package.json');
import * as SocketIO from 'socket.io';
import * as redisAdapter from 'socket.io-redis';

module.exports.plugin = {
    name: `${pkg.name}-socket.io`,
    version: '1.0.0',
    register: async function (server) {

        server.ext({
            type: 'onPreStart',
            method: (server) => {
                server.app.io = SocketIO(server.listener);
                server.app.io.adapter(redisAdapter({
                    pubClient: server.app.pub,
                    subClient: server.app.redis
                }));

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
        });
    }
};
