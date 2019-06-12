import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Selection } from '../store/Models';
import { setSelection } from '../store/Actions';
import { connect } from 'react-redux';

interface IFooterActions
{
    makeSelection(footerSelection : Selection) : void
}
class Footer extends React.Component<{ expanded: boolean} & IFooterActions>
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

        const expandedClass = (this.props.expanded) ? 'expanded' : 'collapsed'

        return (
            <div className={`OuterFooter ${expandedClass}`}>
                <Container fluid={true} className="Footer">
                    <Row>
                        <Col onClick={this.onFooterButtonOTNoteClicked}>
                            <FooterButton>Old Testament Study</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonNTNoteClicked}>
                            <FooterButton>New Testament Study</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonFSNoteClicked}>
                            <FooterButton>Further Study</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonOTPassClicked}>
                            <FooterButton>Old Testament Passages</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonNTPassClicked}>
                            <FooterButton>New Testament Passages</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonPSPassClicked}>
                            <FooterButton>Psalms</FooterButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={this.onFooterButtonPRPassClicked}>
                            <FooterButton>Proverbs</FooterButton>
                        </Col>
                    </Row>
                </Container>
            </div>
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