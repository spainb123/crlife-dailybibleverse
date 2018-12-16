import React from 'react';
import { Pagination, PaginationLink } from 'reactstrap';
import PaginationItem from 'reactstrap/lib/PaginationItem';
import { IStore, IStoreEntry } from '../../store/Models';
import { setActiveEntry } from '../../store/Actions';
import { connect } from 'react-redux';

interface IPaginationViewProps
{
    entries: Array<{ id: number, name: string }>
    activeId: number
}

interface IPaginationViewActions
{
    setActiveEntry(activeId: number) : void
}

class PaginationView extends React.Component<IPaginationViewProps & IPaginationViewActions>
{
    onPrevClicked = () =>
    {
        this.props.setActiveEntry(this.props.activeId - 1);
    }

    onNextClicked = () =>
    {
        this.props.setActiveEntry(this.props.activeId + 1);
    }

    render()
    {
        const prevDisabled = (this.props.activeId == 0);
        const nextDisabled = (this.props.activeId == this.props.entries.length - 1);
        const activeEntry = this.props.entries[this.props.activeId];

        return (
            <Pagination size="lg">
                <PaginationItem
                    disabled={ prevDisabled }>
                    <PaginationLink 
                        previous
                        onClick={this.onPrevClicked} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>
                        {activeEntry.name}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem
                    disabled={ nextDisabled }>
                    <PaginationLink
                        next
                        onClick={this.onNextClicked} />
                </PaginationItem>
            </Pagination>
        )
    }
}

function mapStateToProps(state: IStore) : IPaginationViewProps
{
    const navEntries = state.entries.map((storeEntry: IStoreEntry, index: number) => {
        return { id: index, name: storeEntry.name }
    });

    return {
        entries: navEntries,
        activeId: state.activeEntry
    }
}

function mapDispatchToProps(dispatch: any) : IPaginationViewActions
{
    return {
        setActiveEntry: (activeId: number) => { dispatch(setActiveEntry(activeId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationView);