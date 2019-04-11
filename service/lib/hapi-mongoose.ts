const pkg = require('../../package.json');
import * as mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

module.exports.plugin = {
    name: `${pkg.name}-storage`,
    version: '1.0.0',
    register: async function (server, options) {
        server.ext({
            type: 'onPreStart',
            method: () => {
                return mongoose.connect(options.uri, {
                    socketTimeoutMS: 0,
                    keepAlive: true,
                    reconnectTries: 30,
                    useCreateIndex: true,
                    useNewUrlParser: true
                });
            }
        });

        server.ext({
            type: 'onPreStop',
            method: () => {
                return mongoose.disconnect();
            }
        });
    }
};
