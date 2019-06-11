import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Footer from './Footer';
import ReadingData from './ReadingData';

export default class PortraitLayout extends React.Component
{
    render() {        
        return (
            <div>
                <Container fluid={true} className="Portrait">
                    <Row noGutters={true}>
                        <Col>
                            <ReadingData /> 
                        </Col>
                    </Row>
                </Container>
                <Footer></Footer>
            </div>);
    }
}