import * as fs from 'fs';
import * as path from 'path';
//import * as appfig from 'appfig';  // TODO: Still trying to type this
import { Provider } from 'nconf';
const appfig = require('appfig');

const appConfigFile = path.join(__dirname, './../../app.config.json');  // Secrets that should not be committed to source control

interface AppConfig {
    debug: string,
    meta: 'local' | 'production',
    port: number,
    azure_storage: boolean
}

type AppConfigKey = keyof AppConfig

class ConfigProvider
{
    private config : Provider;
    private _env: string;

    constructor(appEnv: string | null = null) {
        this._env = appEnv || process.env.APP_ENV || 'development';
        this.config = <Provider>appfig(path.join(__dirname, `./settings/${this._env}.json`));

        const appConfig = JSON.parse(fs.readFileSync(appConfigFile).toString());

        for (var propName in appConfig)
        {
            this.config.set(propName, appConfig[propName]);
        }
    }

    get(key: AppConfigKey) : any
    {
        return this.config.get(key); 
    }

    get env() { return this._env; }
}

export default ConfigProvider