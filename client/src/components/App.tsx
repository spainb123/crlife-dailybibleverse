import * as React from 'react';
import IReadingData from '../descriptors/IReadingData';
import PortraitLayout from './PortraitLayout';

export interface AppProps { data: IReadingData}

export class App extends React.Component<AppProps, {}> {

    render() {

        const data = this.props.data;

        return (
            <PortraitLayout data={data}>

            </PortraitLayout>);


    }

}