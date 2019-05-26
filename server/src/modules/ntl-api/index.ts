import { fetchNLTData } from './nlt-api-facade';
import { Request } from 'express-serve-static-core';

interface PassagesQuery {
    ref: string
}

export default async function requestHandler(request: Request) : Promise<string>
{
    return await fetchNLTData( (<PassagesQuery>request.query).ref );
}