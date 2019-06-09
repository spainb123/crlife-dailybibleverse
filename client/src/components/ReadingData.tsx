import * as React from 'react';
import IReadingData from '../descriptors/IReadingData';

const ReadingData: React.SFC<{ data: IReadingData }> = (props) => (
        <div className='ReadingData'>
        <div>Full Date: {props.data.fullDate}</div>
        <h1>Old Testament Notes</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.note.ot }}></div>
        <h1>Old Testament Reading</h1>
        <h2>{props.data.pass.ot.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: props.data.pass.ot.body }}></div>
        <h1>New Testament Notes</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.note.nt }}></div>
        <h1>New Testament Reading</h1>
        <h2>{props.data.pass.nt.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: props.data.pass.nt.body }}></div>
        <h1>Psalms Reading</h1>
        <h2>{props.data.pass.ps.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: props.data.pass.ps.body }}></div>
        <h1>Proverbs Reading</h1>
        <h2>{props.data.pass.pr.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: props.data.pass.pr.body }}></div>
        <h1>Further Study</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.note.fs }}></div>
        </div>
);

export default ReadingData;