import HapiService from './index';
import * as io from 'socket.io-client';
import * as config from 'config';

const hapiService = new HapiService({
    port: 9000,
    externalHostname: 'localhost'
});

describe('HapiService', () => {

    test('should start', async () => {
        await hapiService.start();
        expect(hapiService.state).toBe('started');
    }, 10000);

    test('should provide socket.io', async () => {
        const client = io.connect(`http://localhost:${config.get('port')}`, {'forceNew':true});
        client.on('connect', async () => {
            await client.disconnect();
        });
        await client.connect();
    });

    test('should stop', async () => {
        await hapiService.stop();
        expect(hapiService.state).toBe('stopped');
    });
});