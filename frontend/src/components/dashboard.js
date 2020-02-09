import React, { Component } from "react";
import Message from "./message";
import Admin from "./admin";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../App.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { company: '', reload: false, admin: false }; //Company details
        this.state = { name: '', email: '', keywords: ['', '', ''], description: '', message: '' }; //Company details
        this.updateAccount = this.updateAccount.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleKeywords = this.handleKeywords.bind(this);
    }

    componentDidMount() {
        // Get company
        console.log('components did mount');
        fetch('/company/dashboard')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.company);
                    this.setState({
                        company: result.company,
                        message: result.message,
                        name: result.company.name,
                        email: result.company.email,
                        keywords: result.company.keywords,
                        administrator: result.company.administrator,
                        description: result.company.description,
                    });
                    if (this.state.administrator == true) {
                        this.setState({ admin: true })
                    }
                    if (this.state.message == 'Not logged in') {
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

    // Update account
    updateAccount(event) {
        // Prevent page refresh after submitting form
        event.preventDefault();
        // Create new account
        fetch('/company/updateAccount', {
            method: 'PUT',
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
            }),
        })
            .then(res => res.text())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ message: result });
                    // Only set message state for 3sec for notification to autofade
                    setTimeout(() => { this.setState({ message: '' }) }, 3000)
                },
                (error) => {
                    console.log(error);
                }
            )
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
        if (this.state.reload == true) {
            window.location.href = './login'
        }
        if (!this.state.company) {
            return (
                <div>
                    <Message message={this.state.message} />
                    <Spinner animation='border' role='status' variant='secondary'></Spinner>
                </div>
            )
        }
        else if (this.state.admin == true) {
            return (<Admin />)
        } else {
            return (
                <div>
                    <Message message={this.state.message} />
                    <h4>Update Account</h4>
                    <Form className='Form' onSubmit={this.updateAccount}>
                        <h5>Company Details</h5>
                        <Form.Row>
                            <Col>
                                <Form.Label column sm="2">Name</Form.Label>
                                <Form.Control type='text' defaultValue={this.state.name} id='name' name='name' required onChange={this.handleName} />
                                <Form.Label column sm="2">Email</Form.Label>
                                <Form.Control type='email' defaultValue={this.state.email} id='email' name='email' required onChange={this.handleEmail} />
                                <Form.Label column sm="2">Description</Form.Label>
                                <Form.Control type='text' defaultValue={this.state.description} id='description' name='description' as="textarea" rows="5" required onChange={this.handleDescription} />
                            </Col>
                        </Form.Row>
                        <Form.Label column sm="2">Keywords</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control type='text' defaultValue={this.state.keywords[0]} id='0' name='keyword1' required onChange={this.handleKeywords} />
                            </Col>
                            <Col>
                                <Form.Control type='text' defaultValue={this.state.keywords[1]} id='1' name='keyword2' onChange={this.handleKeywords} />
                            </Col>
                            <Col>
                                <Form.Control type='text' defaultValue={this.state.keywords[2]} id='2' name='keyword3' onChange={this.handleKeywords} />
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Label><Button variant='dark' type='submit'>Update</Button></Form.Label>
                    </Form>
                    <br />
                    <Button variant='dark' type='button' onClick={this.logout} >Log Out</Button>
                </div>
            );
        }
    }
}

export default Dashboard;
