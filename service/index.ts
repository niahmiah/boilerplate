import * as config from 'config';
import * as http from 'http';
import * as Hapi from 'hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as HapiMongoose from './lib/hapi-mongoose';
import * as HapiRedis from './lib/hapi-redis';
import * as HapiSocketIO from './lib/hapi-socket.io';
import * as Inert from 'inert';
import * as Vision from 'vision';
import {defaultHandlerWrapper, nextHandlerWrapper} from './next-wrapper';
import * as Next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = Next({ dev });

class HapiService {
    nextApp: Next.NextConfig;
    server: Hapi.Server;
    state: string;

    constructor(options: {port: number, externalHostname: string}) {
        this.nextApp = nextApp;
        this.server = new Hapi.Server({
            address: '0.0.0.0',
            autoListen: true,
            listener: http.createServer(),
            port: options.port,
            host: options.externalHostname
        });
        this.state = 'stopped';
    }

    async start() {
        this.state = 'starting';
        await this.nextApp.prepare();

        await this.server.register([
          Inert,
          Vision
        ]);

        await this.server.register(
          {
            plugin: HapiSwagger,
            options: config.get('swagger')
          }
        );

        type dbPluginType = {
          plugin: any,
          options?: Object
        };

        const dbPlugin: dbPluginType = {
          plugin: HapiMongoose,
          options: config.get('db')
        };

        const redisPlugin: dbPluginType = {
          plugin: HapiRedis,
          options: config.get('redis')
        };

        const socketIOPlugin: dbPluginType = {
          plugin: HapiSocketIO
        };

        await this.server.register(dbPlugin);

        await this.server.register(redisPlugin);

        await this.server.register(socketIOPlugin);

        this.server.route({
          method: 'GET',
          path: '/_next/{p*}' /* next specific routes */,
          handler: nextHandlerWrapper(this.nextApp)
        });
      
        this.server.route({
          method: 'GET',
          path: '/static/{p*}' /* use next to handle static files */,
          handler: nextHandlerWrapper(this.nextApp)
        });
      
        this.server.route({
          method: 'GET',
          path: '/{p*}' /* catch all route */,
          handler: defaultHandlerWrapper(this.nextApp)
        });

        await this.server.start();
        this.state = 'started';
    }

    async stop() {
        this.state = 'stopping';
        await this.server.stop();
        this.state = 'stopped';
    }
}

export default HapiService;