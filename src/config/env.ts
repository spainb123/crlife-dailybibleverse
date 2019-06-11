import * as fs from 'fs';

const appConfigFile = __dirname + './../../app.config.json';

export default function loadEnvironment()
{
    const appConfig = JSON.parse(fs.readFileSync(appConfigFile).toString());

    // All first level key/values become process environment vars (until such a time as they shouldn't :) )
    for (var propName in appConfig)
    {
        process.env[propName] = appConfig[propName];
    }
}