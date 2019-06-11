import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Selection } from '../store/Models';
import { setSelection } from '../store/Actions';
import { connect } from 'react-redux';
import FooterButton from './FooterButton';

interface IFooterActions
{
    makeSelection(footerSelection : Selection) : void
}
class Footer extends React.Component<IFooterActions>
{
    onFooterButtonOTPassClicked = () => {
        this.props.makeSelection(Selection.PassOT);
    }
    onFooterButtonNTPassClicked = () => {
        this.props.makeSelection(Selection.PassNT);
    }
    onFooterButtonPSPassClicked = () => {
        this.props.makeSelection(Selection.PassPS);
    }
    onFooterButtonPRPassClicked = () => {
        this.props.makeSelection(Selection.PassPr);
    }
    onFooterButtonOTNoteClicked = () => {
        this.props.makeSelection(Selection.NotesOT);
    }
    onFooterButtonNTNoteClicked = () => {
        this.props.makeSelection(Selection.NotesNT);
    }
    onFooterButtonFSNoteClicked = () => {
        this.props.makeSelection(Selection.NotesFS);
    }

    render() {
        return (
            <Container fluid={true} className="Footer">
                <Row className="align-items-center" noGutters={true}>
                    <Col className="align-self-center">Study</Col>
                    <Col className="align-self-center">Reading</Col>
                </Row>
                <Row className="align-items-center" noGutters={true}>
                    <Col>
                        <Row className="align-items-center">
                            <Col className="align-self-center" onClick={this.onFooterButtonOTNoteClicked}>
                                <FooterButton>OT</FooterButton>
                            </Col>
                            <Col className="align-self-center" onClick={this.onFooterButtonNTNoteClicked}>
                                <FooterButton>NT</FooterButton>
                            </Col>
                            <Col className="align-self-center" onClick={this.onFooterButtonFSNoteClicked}>
                                <FooterButton>FS</FooterButton>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="align-items-center">
                            <Col className="align-self-center" onClick={this.onFooterButtonOTPassClicked}>
                                <FooterButton>OT</FooterButton>
                            </Col>
                            <Col className="align-self-center" onClick={this.onFooterButtonNTPassClicked}>
                                <FooterButton>NT</FooterButton>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="align-self-center" onClick={this.onFooterButtonPSPassClicked}>
                                <FooterButton>Ps</FooterButton>
                            </Col>
                            <Col className="align-self-center" onClick={this.onFooterButtonPRPassClicked}>
                                <FooterButton>Pr</FooterButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapDispatchToProps(dispatch: any) : IFooterActions
{
    return {
        makeSelection: (selection: Selection) => { dispatch(setSelection(selection))}
    }
}

export default connect(null, mapDispatchToProps)(Footer);