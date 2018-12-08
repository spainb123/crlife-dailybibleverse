import React from 'react';

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
        if (this.props.activeEntry) 
        {
            return <p onClick={this.onClickHandler}><b>{this.props.name}</b></p>;
        }
        else
        {
            return <p onClick={this.onClickHandler}>{this.props.name}</p>;
        }
    }
}

export default NavigationViewRow;