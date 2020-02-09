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
        this.state = { message: '' }; //Company details
        this.localLogin = this.localLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    // Google login
    googleLogin(event) {
        window.location.href = 'http://localhost:8000/google';
    }

    // Local login
    localLogin(event) {
        // Prevent page refresh after submitting form
        event.preventDefault();
        // Create new account
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
                    else {
                        this.setState({ message: 'Incorrect username or password' });
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

    render() {
        return (
            <div>
                <Message message={this.state.message} />
                <h4>Log In</h4>
                <Form className='Form' onSubmit={this.localLogin}>
                    <h5>Administrator Details</h5>
                    <Form.Row>
                        <Col>
                            <Form.Control type='text' placeholder='Username' id='username' name='username' required onChange={this.handleUsername} />
                            <Form.Control type='password' placeholder='Password' id='password' name='password' required onChange={this.handlePassword} />
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Label><Button variant='dark' type='submit'>Log In</Button></Form.Label>
                </Form>
                <br />
                <h5>OR</h5>
                <br />
                <Button variant='dark' type='button' onClick={this.googleLogin} >Use Google</Button>
            </div>
        );
    }
}

export default Account;







