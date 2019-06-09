import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Footer from './Footer';
import ReadingData from './ReadingData';
import IReadingData from '../descriptors/IReadingData';

export default class PortraitLayout extends React.Component<{ data: IReadingData}>
{
    render() {

        const data = this.props.data;
        
        return (
            <div>
                <Container fluid={true} className="Portrait">
                    <Row noGutters={true}>
                        <Col sm={12}>
                            <ReadingData data={data}></ReadingData> 
                        </Col>
                    </Row>
                </Container>
                <Footer></Footer>
            </div>);
    }
}