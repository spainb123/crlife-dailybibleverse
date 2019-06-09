import * as React from 'react';
import IReadingData from '../descriptors/IReadingData';

export interface AppProps { data: IReadingData}

export class App extends React.Component<AppProps, {}> {

    render() {

        const data = this.props.data;

        return (
            <div className='App'>
                <div>Full Date: {data.fullDate}</div>
                <h1>Old Testament Notes</h1>
                <div dangerouslySetInnerHTML={{ __html: data.note.ot }}></div>
                <h1>Old Testament Reading</h1>
                <h2>{data.pass.ot.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.pass.ot.body }}></div>
                <h1>New Testament Notes</h1>
                <div dangerouslySetInnerHTML={{ __html: data.note.nt }}></div>
                <h1>New Testament Reading</h1>
                <h2>{data.pass.nt.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.pass.nt.body }}></div>
                <h1>Psalms Reading</h1>
                <h2>{data.pass.ps.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.pass.ps.body }}></div>
                <h1>Proverbs Reading</h1>
                <h2>{data.pass.pr.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.pass.pr.body }}></div>
                <h1>Further Study</h1>
                <div dangerouslySetInnerHTML={{ __html: data.note.fs }}></div>
            </div>
        )
    }

}