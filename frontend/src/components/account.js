import React, { Component } from "react";
import Message from "./message";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../App.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }; //Administator details
        this.state = { name: '', email: '', keywords: ['', '', ''], description: '', message: '' }; //Company details
        this.localAccount = this.localAccount.bind(this);
        this.googleAccount = this.googleAccount.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleKeywords = this.handleKeywords.bind(this);
    }

    // Google account
    googleAccount(event) {
        window.location.href = 'http://localhost:8000/google';
    }

    // Local account
    localAccount(event) {
        // Prevent page refresh after submitting form
        event.preventDefault();
        fetch('/company/newAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                keywords: this.state.keywords,
                description: this.state.description,
                administrator: false,
                visible: true
            }),
        })
            .then(res => res.text())
            .then(
                (result) => {
                    // Establish login session
                    if (result == 'Company successfully created') {
                        fetch('/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: this.state.username,
                                password: this.state.password,
                            }),
                        })
                            .then(res => res.text())
                            .then(
                                (result) => {
                                    if (result != 'Unauthorized') {
                                        window.location.href = 'http://localhost:3000/dashboard';
                                    }
                                },
                                (error) => {
                                    console.log(error);
                                }
                            );
                    }
                    else {
                        this.setState({ message: 'Company already exists' });
                        // Only set message state for 3sec for notification to autofade
                        setTimeout(() => { this.setState({ message: '' }) }, 3000)
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    // Handle username
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    // Handle password
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    // Handle name
    handleName(event) {
        this.setState({ name: event.target.value });
    }
    // Handle email
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    // Handle description
    handleDescription(event) {
        this.setState({ description: event.target.value });
    }
    // Handle keywords
    handleKeywords(event) {
        this.setState({
            // Store keywords in array
            keywords: this.state.keywords.map((item, index) => {
                if (index == event.target.id) {
                    return event.target.value;
                } else {
                    return item;
                }
            })
        })
    }

    render() {
        return (
            <div>
                <Message message={this.state.message} />
                <h4>Create Account</h4>
                <Form className='Form' onSubmit={this.localAccount}>
                    <h5>Administrator Details</h5>
                    <Form.Row>
                        <Col>
                            <Form.Control type='text' placeholder='Username' id='username' name='username' required onChange={this.handleUsername} />
                            <Form.Control type='password' placeholder='Password' id='password' name='password' required onChange={this.handlePassword} />
                        </Col>
                    </Form.Row>
                    <h5>Company Details</h5>
                    <Form.Row>
                        <Col>
                            <Form.Control type='text' placeholder='Name' id='name' name='name' required onChange={this.handleName} />
                            <Form.Control type='email' placeholder='Email' id='email' name='email' required onChange={this.handleEmail} />
                            <Form.Control type='text' placeholder='Description' id='description' name='description' as="textarea" rows="5" required onChange={this.handleDescription} />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Control type='text' placeholder="Keyword 1" id='0' name='keyword1' required onChange={this.handleKeywords} />
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder="Keyword 2" id='1' name='keyword2' onChange={this.handleKeywords} />
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder="Keyword 3" id='2' name='keyword3' onChange={this.handleKeywords} />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Label><Button variant='dark' type='submit'>Create</Button></Form.Label>
                </Form>
                <br />
                <h5>OR</h5>
                <br />
                <Button variant='dark' type='button' onClick={this.googleAccount} >Use Google</Button>
            </div>
        );
    }
}

export default Account;



