import HapiService from './service/index';
import * as config from 'config';

(async () => {
    const service = new HapiService({
        port: config.get('port'),
        externalHostname: config.get('externalHostname')
    });
    
    async function start() {
        try {
            await service.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    
        console.log('Server running at:', service.server.info.uri);
        console.log('Documentation at:', `${service.server.info.uri}/documentation`);
    }
    
    async function stop() {
        try {
            await service.stop();
            console.log('Server stopped.');
        } catch (err) {
            console.log(err);
            console.log('Server killed.');
            process.exit(1);
        }
    }
    
    process.on('SIGTERM', stop);
    process.on('SIGINT', stop);

    await start();
})();