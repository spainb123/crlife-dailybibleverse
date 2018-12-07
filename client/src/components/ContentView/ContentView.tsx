import React, { MouseEvent } from 'react';
import ContentViewButton from './ContentViewButton';
import ContentViewContents from './ContentViewContents';

interface State {
    contents: string
}

class ContentView extends React.Component
{
    readonly state: Readonly<State> = stateDevotional(); // initialState
    
    onDevotionalClicked = (e: MouseEvent<HTMLElement>) : void =>
    {
        this.setState(stateDevotional)
        console.log('show devotional');
    }

    onReadingClicked = (e: MouseEvent<HTMLElement>) : void =>
    {
        this.setState(stateReading)
        console.log('show reading');
    }

    render()
    {
        return (
            <div className="row">
                <ContentViewButton
                    onClick={this.onDevotionalClicked}
                    children='Devotional'
                ></ContentViewButton>
                <ContentViewButton
                    onClick={this.onReadingClicked}
                    children='Reading'
                ></ContentViewButton>
                <ContentViewContents
                    content={this.state.contents}>
                </ContentViewContents>            
            </div>
        );
    }
}

const stateDevotional = (prevState?: State) => ({ contents: 'Devotional' });
const stateReading = (prevState?: State) => ({ contents: 'Reading' });

export default ContentView;