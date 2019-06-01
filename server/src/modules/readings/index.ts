import { Request, Response } from "express-serve-static-core";
import { ReadingRef, fetchReading } from './readingsService';

interface ReadingsQuery {
    ref: string
}

export default function requestHander(request: Request, response: Response) : void
{
    const today = new Date();

    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (request.query && request.query.ref)
    {
        const splits = (<ReadingsQuery>request.query).ref.split('-');
        month = parseInt(splits[0]);
        day = parseInt(splits[1]);
    }

    fetchReading({ month, day }).then(data => {
        response.send(data);
    })
}