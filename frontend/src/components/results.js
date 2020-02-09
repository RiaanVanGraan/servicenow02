import React, { Component } from "react";
import '../App.css';
import Message from "./message";
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner'

var queryString = require('query-string');

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = { companies: '', message: '', reload: false }; //Company details
    }

    componentDidMount() {
        // Get companies
        const parsedQuery = queryString.parse(window.location.search).search;
        fetch('/company/results/' + parsedQuery)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        companies: result.companies,
                        message: result.message
                    });
                    if (this.state.message == 'No results found') {
                        setTimeout(() => { this.setState({ reload: true }) }, 3000)
                    }
                    // Only set message state for 3sec for notification to autofade
                    setTimeout(() => { this.setState({ message: '' }) }, 3000)
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        if (this.state.reload == true) {
            window.location.href = './'
        }
        if (!this.state.companies) {
            return (
                <div>
                    <Message message={this.state.message} />
                    <Spinner animation='border' role='status' variant='secondary'></Spinner>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Message message={this.state.message} />
                    {this.state.companies.map((item, index) => (
                        <div key={index}>
                            <br />
                            <Card className="Card">
                                <Card.Header className="CardHeader">
                                    {item.name}
                                </Card.Header>
                                <Card.Body>
                                    <Tabs defaultActiveKey="summary">
                                        <Tab eventKey="summary" title="Summary">
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                        </Tab>
                                        <Tab eventKey="contact" title="Contact">
                                            <Card.Text>
                                                {item.email}
                                            </Card.Text>
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Results;


