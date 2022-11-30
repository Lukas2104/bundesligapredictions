import React, { useEffect, useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
                    <Navbar.Brand href='#home'>{props.title}</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
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
                this.setState({fixtures: fixtures});
            })
    }

    componentDidUpdate(){
        axios.get('http://localhost:8000/fixtures')
            .then(response => {
                const fixtures = response.data;
                this.setState({fixtures: fixtures});
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
                        {this.state.fixtures.map (fixture => {return <tr> <td>{fixture.home}</td> <td>:</td> <td>{fixture.away}</td> <td>{fixture.winner}</td> </tr>})}
                    </tbody>
                </Table>
           </Col>
        )
    }
}

function CurrStandings(){
    const [standings, setStandings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/standings')
            .then(response => {
                const standings = response.data;
                console.log(Array.isArray(standings))
                setStandings(standings);
            })
    })

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
                    {standings.map (club => {return <tr onClick={() => navigate('/standings')}> <td>{club.rank}</td> <td>{club.name}</td> <td>{club.points}</td> </tr>})}
                </tbody>
            </Table> 
        </Col>
    )
}


class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.body.style.backgroundColor = '#212529';
    }

    render() {
        return(
            <div>
                <Header title="Bundesliga Predictions" />
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

class TablePage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.body.style.backgroundColor = '#212529';
    }

    render() {
        return(
            <div>
                <Header title="Bundesliga Table" />
                <CurrStandings />
            </div>
        )
    }

}

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/standings' element={<TablePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<App />)