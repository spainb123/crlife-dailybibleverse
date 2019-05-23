import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavigationView from '../../components/NavigationView/NavigationView';
import ContentView from '../../components/ContentView/ContentView';
import { connect } from 'react-redux';
import { IStore } from '../../store/Models';

interface ILandscapeLayoutProps
{
    loading: boolean
}

class LandscapeLayout extends React.Component<ILandscapeLayoutProps>
{
    render()
    {
        if (this.props.loading)
        {
            return (<div className="Landscape">Loading...</div>);
        }
        else
        {
            return (                         
                <Container className="Landscape">
                    <Row>
                        <Col xs="3" className="NavViewCol">
                            <NavigationView></NavigationView>
                        </Col>
                        <Col xs="9">
                            <ContentView/>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

function mapStateToProps(state: IStore) : ILandscapeLayoutProps
{
    return { loading: state.loading }
}

export default connect(mapStateToProps)(LandscapeLayout);