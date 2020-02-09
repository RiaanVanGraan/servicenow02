import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { search: '' };
        this.search = this.search.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    search(event) {
          window.location.href='./results?search=' + this.state.search;
    }

    handleSearch(event) {
        this.setState({ search: event.target.value });
    }

    render() {
        return (
            <div>
                <br />
                <h4>Search your Service Now!</h4>
                <br />
                <Button variant='dark' type='button' onClick={this.search} disabled={!this.state.search} >Search</Button>
                <br />
                <br />
                <Form className='Form'>
                    <Form.Row>
                        <Col>
                            <Form.Control size="md" type='text' id='search' name='search' onChange={this.handleSearch} />
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default Home;
