import React from 'react';
import NavigationViewRow from './NavigationViewRow';

interface State {
    activeEntry: string
    entries: string[]
}

class NavigationView extends React.Component
{
    readonly state: Readonly<State> = 
    {
        activeEntry: 'two',
        entries: [
            'one', 'two', 'three'
        ]
    }

    onEntryClicked = (entry: string) => {
        this.setState(stateActiveEntry(this.state, entry));
    }

    render()
    {
        return (
            <div>
            { 
                this.state.entries.map(entry => {
                    return <NavigationViewRow
                        key={entry} // Not explicitly part of NavigationViewRow props, but React uses this in iterators
                        entry={entry}
                        activeEntry={(entry == this.state.activeEntry)}
                        onClick={this.onEntryClicked} />
                    })
            }
            </div>
        );
    }
}

const stateActiveEntry = (prevState: State, newEntry: string) => {
    return { ...prevState, ...{ activeEntry: newEntry } }
};

export default NavigationView