import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Selection } from '../store/Models';
import { setSelection } from '../store/Actions';
import { connect } from 'react-redux';
import Chevron from './Chevron/Chevron';

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
                <Row className="align-items-center">
                    <Col className="align-self-center"><div className="text-center">Study</div></Col>
                    <Col className="align-self-center"><div className="text-center">Reading</div></Col>
                </Row>
                <Row className="align-items-center">
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

const FooterButton: React.SFC<{ children: string }> = (props) => {
    return <div className="FooterButton text-center">{props.children}</div>;
}

export default connect(null, mapDispatchToProps)(Footer);