const pkg = require('../../package.json');
import * as Redis from 'ioredis';

module.exports.plugin = {
    name: `${pkg.name}-redis`,
    version: '1.0.0',
    register: async function (server, options) {
       server.app.redis = new Redis(options);
       server.app.pub = new Redis(options);
    }
};
