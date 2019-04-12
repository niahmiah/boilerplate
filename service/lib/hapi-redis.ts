const pkg = require('../../package.json');
import * as Redis from 'ioredis';

module.exports.plugin = {
    name: `${pkg.name}-redis`,
    version: '1.0.0',
    once: true,
    register: async function (server, options) {
        server.ext({
            type: 'onPreStart',
            method: (server) => {
                server.app.redis = new Redis(options);
                server.app.pub = new Redis(options);
            }
        });

        server.ext({
            type: 'onPostStop',
            method: async (server) => {
                await server.app.redis.quit();
                await server.app.pub.quit();
            }
        });
    }
};
