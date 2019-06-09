import IReadingData from "../store/IReadingData";

export default function ParseServerSideData(data: string) : IReadingData
{
    const ssrData = <IReadingData>JSON.parse(data);

    // Decode all content pieces
    ssrData.note.ot = decodeURIComponent(ssrData.note.ot);
    ssrData.note.nt = decodeURIComponent(ssrData.note.nt);
    ssrData.note.fs = decodeURIComponent(ssrData.note.fs);
    ssrData.pass.ot.body = decodeURIComponent(ssrData.pass.ot.body);
    ssrData.pass.nt.body = decodeURIComponent(ssrData.pass.nt.body);
    ssrData.pass.pr.body = decodeURIComponent(ssrData.pass.pr.body);
    ssrData.pass.ps.body = decodeURIComponent(ssrData.pass.ps.body);

    return ssrData;
}