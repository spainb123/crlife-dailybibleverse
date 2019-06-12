import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Footer from './Footer';
import ReadingData from './ReadingData';
import Chevron from './Chevron/Chevron';
import { IStore } from '../store/Models';
import { connect } from 'react-redux';
import { toggleFooter } from '../store/Actions';

interface IPortraitLayoutProps
{
    expanded: boolean
}

interface IPortraitLayoutActions
{
    toggleFooterExpand() : void
}

class PortraitLayout extends React.Component<IPortraitLayoutProps & IPortraitLayoutActions>
{
    onChevronClicked = () => {
        this.props.toggleFooterExpand();
    }

    render() {        
        return (
            <div className="Portrait">
                <Container fluid={true}>
                    <Row noGutters={true}>
                        <Col>
                            <ReadingData /> 
                        </Col>
                    </Row>
                </Container>
                <Footer expanded={this.props.expanded}/>
                <Chevron 
                    direction={(this.props.expanded) ? 'down' : 'up'}
                    onClick={this.onChevronClicked} />
            </div>);
    }
}

function mapStateToProps(state: IStore) : IPortraitLayoutProps
{
    return {
        expanded: state.footerExpanded
    }
}

function mapDispatchToProps(dispatch: any) : IPortraitLayoutActions
{
    return {
        toggleFooterExpand: () => { dispatch(toggleFooter())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortraitLayout);