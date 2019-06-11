import * as path from 'path';
import * as fs from 'fs';
const metaConfigFile = path.join(__dirname, './../../data/meta.json');

export default function loadMetadata()
{
    const metaConfig = JSON.parse(fs.readFileSync(metaConfigFile).toString());
    return metaConfig;
}