import * as React from 'react';
import IReadingData from '../descriptors/IReadingData';

const ReadingData: React.SFC<{ data: IReadingData }> = (props) => (
        <div className='ReadingData'>
                <div>Full Date: {props.data.fullDate}</div>
                <div id={'OTNOTE'} dangerouslySetInnerHTML={{ __html: props.data.note.ot }}></div>
                <h1 id={'OTHEAD'}>Old Testament Reading</h1>
                <h2>{props.data.pass.ot.heading}</h2>
                <div id={'OTBODY'} dangerouslySetInnerHTML={{ __html: props.data.pass.ot.body }}></div>
                <div id={'NTNOTE'} dangerouslySetInnerHTML={{ __html: props.data.note.nt }}></div>
                <h1 id={'NTHEAD'}>New Testament Reading</h1>
                <h2>{props.data.pass.nt.heading}</h2>
                <div id={'NTBODY'} dangerouslySetInnerHTML={{ __html: props.data.pass.nt.body }}></div>
                <h1 id={'PSHEAD'}>Psalms Reading</h1>
                <h2>{props.data.pass.ps.heading}</h2>
                <div id={'PSBODY'} dangerouslySetInnerHTML={{ __html: props.data.pass.ps.body }}></div>
                <h1 id={'PRHEAD'}>Proverbs Reading</h1>
                <h2>{props.data.pass.pr.heading}</h2>
                <div id={'PRBODY'} dangerouslySetInnerHTML={{ __html: props.data.pass.pr.body }}></div>
                <div id={'FSNOTE'} dangerouslySetInnerHTML={{ __html: props.data.note.fs }}></div>
                <div id={'READBUFFER'}></div>
        </div>
);

export default ReadingData;