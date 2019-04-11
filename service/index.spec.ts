import HapiService from './index';

const hapiService = new HapiService({
    port: 9000,
    externalHostname: 'localhost'
});

describe('HapiService', () => {

    test('should start', async () => {
        await hapiService.start();
        expect(hapiService.state).toBe('started');
    }, 10000);

    test('should stop', async () => {
        await hapiService.stop();
        expect(hapiService.state).toBe('stopped');
    });

});