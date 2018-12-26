import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ContentView from '../../components/ContentView/ContentView';
import PaginationView from '../../components/PaginationView/PaginationView';
import { IStore } from '../../store/Models';
import { connect } from 'react-redux';

interface IPortraitLayoutProps
{
    loading: boolean
}

class PortraitLayout extends React.Component<IPortraitLayoutProps>
{
    render()
    {
        if(this.props.loading)
        {
            return (<div className="Portrait">Loading...</div>);
        }
        else
        {
            return (
                <Container className="Portrait">
                    <Row>
                        <Col>
                            <ContentView/>
                        </Col>
                    </Row>
                    <div className="PageNav">
                        <PaginationView />
                    </div>
                </Container>
            )
        }
    }
}

function mapStateToProps(state: IStore) : IPortraitLayoutProps
{
    return { loading: state.loading }
}

export default connect(mapStateToProps)(PortraitLayout);