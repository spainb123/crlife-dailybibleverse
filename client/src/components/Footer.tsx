import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Footer extends React.Component
{
    onFooterButtonOTPassClicked = () => {
        document.getElementById('OTHEAD').scrollIntoView();
    }
    onFooterButtonNTPassClicked = () => {
        document.getElementById('NTHEAD').scrollIntoView();
    }
    onFooterButtonPSPassClicked = () => {
        document.getElementById('PSHEAD').scrollIntoView();
    }
    onFooterButtonPRPassClicked = () => {
        document.getElementById('PRHEAD').scrollIntoView();
    }
    onFooterButtonOTNoteClicked = () => {
        document.getElementById('OTNOTE').scrollIntoView();
    }
    onFooterButtonNTNoteClicked = () => {
        document.getElementById('NTNOTE').scrollIntoView();
    }
    onFooterButtonFSNoteClicked = () => {
        document.getElementById('FSNOTE').scrollIntoView();
    }

    render() {
        return (
            <Container fluid={true} className="Footer">
                <Row noGutters={true}>
                    <Col sm={6}>Study</Col>
                    <Col sm={6}>Reading</Col>
                </Row>
                <Row noGutters={true}>
                    <Col sm={6}>
                        <Row>
                            <Col sm={4} onClick={this.onFooterButtonOTNoteClicked}>OT</Col>
                            <Col sm={4} onClick={this.onFooterButtonNTNoteClicked}>NT</Col>
                            <Col sm={4} onClick={this.onFooterButtonFSNoteClicked}>More</Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={3} onClick={this.onFooterButtonOTPassClicked}>OT</Col>
                            <Col sm={3} onClick={this.onFooterButtonNTPassClicked}>NT</Col>
                            <Col sm={3} onClick={this.onFooterButtonPSPassClicked}>Psalm</Col>
                            <Col sm={3} onClick={this.onFooterButtonPRPassClicked}>Proverbs</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    } 
}