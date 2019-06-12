import * as React from 'react'
import './Chevron.scss'
import chevronSvg from './chevron.svg';

const Chevron: React.SFC = () => {
    return (
        <div className="chevron" dangerouslySetInnerHTML={{__html: chevronSvg}} />
        );
}

export default Chevron;