import fetch from 'node-fetch';

const nltEndpoint = "http://api.nlt.to/api/passages";
const nltKey = process.env.NLT_API_KEY;

export async function fetchNLTData(nltRef: string) : Promise<string> 
{
    const response = await fetch(`${nltEndpoint}?ref=${nltRef}&version=nlt&key=${nltKey}`);
    return response.text();
}
