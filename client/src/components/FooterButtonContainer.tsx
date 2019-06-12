import * as React from 'react';
import { Col } from 'reactstrap';
import FooterButton from './FooterButton';
import { Selection } from '../store/Models';

interface FooterButtonContainerProps {
    children: string,
    selectionOption: Selection,
    onClick(selection: Selection): void 
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