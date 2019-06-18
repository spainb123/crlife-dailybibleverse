import * as React from 'react';
import { Col } from 'reactstrap';
import FooterButton from './FooterButton';
import { Selection, NavRef } from '../store/Models';

interface FooterButtonContainerProps {
    children: string,
    selectionOption: Selection | NavRef,
    onClick(selection: Selection | NavRef): void 
}

const FooterButtonContainer: React.SFC<FooterButtonContainerProps> = (props) => {

    const handleClick = () => {
        props.onClick(props.selectionOption);
    }

    return <Col onClick={handleClick}>
        <FooterButton>{props.children}</FooterButton>
    </Col>
}

export default FooterButtonContainer;