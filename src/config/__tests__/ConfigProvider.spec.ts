import ConfigProvider from '../ConfigProvider';

describe('Config provider', () => {
    it('Will load development by default', () => {
        const config = new ConfigProvider();
        expect(config.env).toBe("development");
    })
})