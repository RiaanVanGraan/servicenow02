import React, { Component } from "react";
import '../App.css';
import Message from "./message";
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { companies: '', message: '', reload: false, forceRender: false }; //Company details
        this.manageAccount = this.manageAccount.bind(this);
        this.buttonText = this.buttonText.bind(this);
    }

    componentDidMount() {
        // Get companies
        fetch('/company/dashboard/admin/')
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

    // Log out
    logout(event) {
        window.location.href = 'http://localhost:8000/logout';
    }

    // Manage account
    manageAccount(item) {
        fetch('/company/updateAccount/admin', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: item.name,
                visible: !(item.visible)
            }),
        })
            .then(res => res.text())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ message: result });
                    // Only set message state for 3sec for notification to autofade
                    setTimeout(() => { this.setState({ message: '', forceRender: true }) }, 3000)
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    //Define block/unblock button text
    buttonText(visible) {
        if (visible == true) {
            return ('Block Account')
        }
        else {
            return ('Unblock Account')
        }
    }

    render() {
        if (this.state.forceRender == true) {
            this.setState({ forceRender: false })
            this.componentDidMount()
        }
        if (this.state.reload == true) {
            return (
                <div>
                    <br />
                    <h5>No results found</h5>
                </div>
            )
        }
        if (!this.state.companies) {
            return (
                <div>
                    <br />
                    <br />
                    <Spinner animation='border' role='status' variant='secondary'></Spinner>
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.companies.map((item, index) => (
                        <div key={index}>
                            <br />
                            <Card className="Card">
                                <Card.Header className="CardHeader">
                                    {item.name}
                                </Card.Header>
                                <Card.Body>
                                    <Button variant='dark' type='button' onClick={() => this.manageAccount(item)} >{this.buttonText(item.visible)}</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    <br />
                    <Button variant='dark' type='button' onClick={this.logout} >Log Out</Button>
                </div>
            );
        }
    }
}

export default Admin;


