import 'jest';
import ConfigProvider from '../ConfigProvider';

describe('Config provider', () => {
    afterEach(() => {
        // Clean up all environment variables
        if ( process.env["NLT_API_KEY"]) {
            delete process.env.NLT_API_KEY;
        }
    })
    
    it('Will load development by default', () => {
        const config = new ConfigProvider();
        expect(config.env).toBe("development");
        expect(config.get("meta")).toBe("local");
    })

    it('will load values from environment', () => {
        process.env["NLT_API_KEY"] = 'nlt-api-key';

        const config = new ConfigProvider();
        expect(config.get("NLT_API_KEY")).toBe("nlt-api-key");
    })
})