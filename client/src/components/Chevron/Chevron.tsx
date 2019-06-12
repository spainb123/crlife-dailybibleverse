import * as React from 'react'
import './Chevron.scss'
import chevronUpSvg from './chevron-up.svg';

const Chevron: React.SFC<{ direction: 'up' | 'down' }> = (props) => {
    
    const classValue = `chevron ${props.direction}`;

    return (
        <div className={classValue} dangerouslySetInnerHTML={{__html: chevronUpSvg}} />
        );
}

export default Chevron;