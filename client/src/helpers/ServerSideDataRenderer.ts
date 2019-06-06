import IReadingData from "../descriptors/IReadingData";

export default function ParseServerSideData(data: string) : IReadingData
{
    const ssrData = <IReadingData>JSON.parse(data);

    // Decode all content pieces
    ssrData.note.ot = decodeURIComponent(ssrData.note.ot);
    ssrData.note.nt = decodeURIComponent(ssrData.note.nt);
    ssrData.note.fs = decodeURIComponent(ssrData.note.fs);
    ssrData.pass.ot = decodeURIComponent(ssrData.pass.ot);
    ssrData.pass.nt = decodeURIComponent(ssrData.pass.nt);
    ssrData.pass.pr = decodeURIComponent(ssrData.pass.pr);
    ssrData.pass.ps = decodeURIComponent(ssrData.pass.ps);

    return ssrData;
}