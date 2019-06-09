import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Selection } from '../store/Models';
import { setSelection } from '../store/Actions';
import { connect } from 'react-redux';

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

function mapDispatchToProps(dispatch: any) : IFooterActions
{
    return {
        makeSelection: (selection: Selection) => { dispatch(setSelection(selection))}
    }
}

export default connect(null, mapDispatchToProps)(Footer);