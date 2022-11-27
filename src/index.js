import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import axios from 'axios';

// Bootstrap and other style
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { type } from '@testing-library/user-event/dist/type';
import { Table } from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import { render } from '@testing-library/react';

function Header(props){
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='#home'>Bundesliga Predictions</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

class CurrStandings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            standings: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/standings')
            .then(response => {
                const standings = response.data;
                this.setState({standings});
            })
    }

    render() {
        return(
           <Col xs={6} md={4}>
                <Table striped hover variant='dark' size='sm'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Club</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.standings.map (club => {return <tr> <td>{club.rank}</td> <td>{club.name}</td> <td>{club.points}</td> </tr>})}
                    </tbody>
                </Table>
           </Col>
        )
    }
}

class CurrFixtures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixtures: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/fixtures')
            .then(response => {
                const fixtures = response.data;
                this.setState({fixtures});
            })
    }

    render() {
        return(
           <Col xs={12} md={8}>
                <Table striped hover variant='dark'>
                    <thead>
                        <tr>
                            <th>Home</th>
                            <th></th>
                            <th>Away</th>
                            <th>Prediction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.fixtures.map (fixture => {return <tr> <td>{fixture.home}</td> <td>:</td> <td>{fixture.away}</td> <td>-</td> </tr>})}
                    </tbody>
                </Table>
           </Col>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.body.style.backgroundColor = '#212529';
    }

    render() {
        return(
            <div>
                <Header />
                <Container id="mainContainer">
                    <Row id="firstRow">
                        <CurrFixtures />
                        <CurrStandings />
                    </Row>
                </Container>
            </div>
        )
    }
}

const root = createRoot(document.getElementById("root"));
root.render(<App />)