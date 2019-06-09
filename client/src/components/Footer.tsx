import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Footer extends React.Component
{
    render() {
        return (
            <Container fluid={true} className="Footer">
                <Row noGutters={true}>
                    <Col sm={12}>Footer</Col>
                </Row>
            </Container>
        )
    } 
}