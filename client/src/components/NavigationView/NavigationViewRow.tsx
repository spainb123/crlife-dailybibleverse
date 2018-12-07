import React from 'react';

type Props = {
    entry: string,
    activeEntry: boolean,
    onClick(entry: string) : void
}

class NavigationViewRow extends React.Component<Props, object>
{
    onClickHandler = () => {
        this.props.onClick(this.props.entry);
    }

    render()
    {
        if (this.props.activeEntry) 
        {
            return <p onClick={this.onClickHandler}><b>{this.props.entry}</b></p>;
        }
        else
        {
            return <p onClick={this.onClickHandler}>{this.props.entry}</p>;
        }
    }
}

export default NavigationViewRow;