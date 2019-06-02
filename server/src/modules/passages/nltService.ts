import fetch from 'node-fetch';
import Logger from '../../logger';

const nltEndpoint = "http://api.nlt.to/api/passages";
const nltKey = process.env.NLT_API_KEY;

export async function fetchNLTData(nltRef: string, logger: Logger) : Promise<string> 
{
    logger.debug(logger.modules.MODULE_PASSAGES, `Fetching NLT.to for ${nltRef}`)

    const response = await fetch(`${nltEndpoint}?ref=${nltRef}&version=nlt&key=${nltKey}`);
    return response.text();
}
