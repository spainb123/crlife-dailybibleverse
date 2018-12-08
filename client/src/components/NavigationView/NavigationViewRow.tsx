import React from 'react';
import { ListGroupItem } from 'reactstrap';

type Props = {
    id: number,
    name: string,
    activeEntry: boolean,
    onClick(entryId: number) : void
}

class NavigationViewRow extends React.Component<Props, object>
{
    onClickHandler = () => {
        this.props.onClick(this.props.id);
    }

    render()
    {
        return <ListGroupItem 
            active={this.props.activeEntry}
            onClick={this.onClickHandler}>{this.props.name}</ListGroupItem>
    }
}

export default NavigationViewRow;