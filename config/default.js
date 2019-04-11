const pkg = require('../package.json');

const environment = process.env.ENVIRONMENT || process.env.NODE_ENV || 'development';

const externalHostname = process.env.EXTERNAL_HOSTNAME || 'localhost';
const externalPort = parseInt(`${process.env.EXTERNAL_PORT}`) || 80;

let swaggerHost = externalHostname;
if (externalPort !== 80) {
    swaggerHost = `${swaggerHost}:${externalPort}`;
}

const config = {
    db: {
        uri: process.env.DB_CONN_STRING || `mongodb://localhost:27017/service-${environment}`,
    },
    redis: {
        port: 6379,          // Redis port
        host: process.env.REDIS_HOST || 'localhost'
    },
    pkg,
    port: parseInt(`${process.env.PORT}`) || 3000,
    externalHostname,
    externalPort,
    swagger: {
        info: {
            title: `${pkg.name} API Documentation`,
            version: pkg.version
        },
        host: swaggerHost
    }
};

module.exports = config;