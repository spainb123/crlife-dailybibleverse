import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Selection, NavRef } from '../store/Models';
import { setSelection, toggleFooter } from '../store/Actions';
import { connect } from 'react-redux';
import FooterButtonContainer from './FooterButtonContainer';

interface IFooterProps
{
    expanded: boolean,
    prevRef: string,
    nextRef: string,
    furtherStudy: boolean
}
interface IFooterActions
{
    makeSelection(footerSelection : Selection) : void
}
class Footer extends React.Component<IFooterProps & IFooterActions>
{
    onFooterButtonContainerClicked = (selection: Selection) => {
        this.props.makeSelection(selection);
    }

    onNavButtonContainerClicked = (ref: NavRef) => {
        const targetRef = (ref == NavRef.Next) ? this.props.nextRef : this.props.prevRef;
        window.location.href = `${window.location.origin}${window.location.pathname}?ref=${targetRef}`;
    }

    render() {

        const expandedClass = (this.props.expanded) ? 'expanded' : 'collapsed'

        return (
            <div className={`OuterFooter ${expandedClass}`}>
                <Container fluid={true} className="Footer">
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.NotesOT}>Old Testament Study</FooterButtonContainer>
                    </Row>
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.NotesNT}>New Testament Study</FooterButtonContainer>
                    </Row>
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.PassOT}>Old Testament Passages</FooterButtonContainer>
                    </Row>
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.PassNT}>New Testament Passages</FooterButtonContainer>
                    </Row>
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.PassPS}>Psalms</FooterButtonContainer>
                    </Row>
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.PassPr}>Proverbs</FooterButtonContainer>
                    </Row>
                    {this.props.furtherStudy &&
                    <Row>
                        <FooterButtonContainer 
                            onClick={this.onFooterButtonContainerClicked}
                            selectionOption={Selection.NotesFS}>Further Study</FooterButtonContainer>
                    </Row>
                    }
                    <div className={`buttonNavDivider`}/>
                    <Row className={`navRow`}>
                        <FooterButtonContainer onClick={this.onNavButtonContainerClicked}
                        selectionOption={NavRef.Prev}>{'<'}</FooterButtonContainer>
                        <FooterButtonContainer onClick={this.onNavButtonContainerClicked}
                        selectionOption={NavRef.Next}>{'>'}</FooterButtonContainer>
                        {/* <Col>{this.props.prevRef}</Col>
                        <Col>{this.props.nextRef}</Col> */}
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: any) : IFooterActions
{
    return {
        makeSelection: (selection: Selection) => { 
            dispatch(toggleFooter());
            dispatch(setSelection(selection));
        }
    }
}

export default connect(null, mapDispatchToProps)(Footer);