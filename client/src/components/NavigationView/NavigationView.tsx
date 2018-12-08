import React from 'react';
import NavigationViewRow from './NavigationViewRow';
import { IStore, IStoreEntry } from '../../store/Models';
import { setActiveEntry } from '../../store/Actions';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

interface INavigationViewProps
{
    entries: Array<{ id: number, name: string }>
    activeId: number
}

interface INavigationViewActions
{
    setActiveEntry(activeId:number) : void
}

class NavigationView extends React.Component<INavigationViewProps & INavigationViewActions>
{
    onEntryClicked = (entryId: number) => {
        this.props.setActiveEntry(entryId);
    }

    render()
    {
        return (
            <ListGroup>
            { 
                this.props.entries.map(entry => {
                    return <NavigationViewRow
                        key={entry.id} // Not explicitly part of NavigationViewRow props, but React uses this in iterators
                        id={entry.id}
                        name={entry.name}
                        activeEntry={(entry.id == this.props.activeId)}
                        onClick={this.onEntryClicked} />
                    })
            }
            </ListGroup>
        );
    }
}

function mapStateToProps(state: IStore) : INavigationViewProps
{
    const navEntries = state.entries.map((storeEntry: IStoreEntry, index: number) => {
        return { id: index, name: storeEntry.name }
    });

    return {
        entries: navEntries,
        activeId: state.activeEntry
    }
}

function mapDispatchToProps(dispatch: any) : INavigationViewActions
{
    return {
        setActiveEntry: (activeId: number) => { dispatch(setActiveEntry(activeId)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationView);