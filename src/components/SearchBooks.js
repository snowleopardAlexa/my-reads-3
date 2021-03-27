import React, { Component } from 'react';
import { Jumbotron, Container, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from '../BooksAPI';
import backarrow from "../img/back-arrow.png";

class SearchBooks extends Component {
    render() {
        return (
        <div className="searchbooks">
         <Jumbotron fluid style={{backgroundColor: 'orange'}}>
          <Link to="/" className="close-search">
          <Image className="ml-4" src={backarrow} height="34" width="40" />
          </Link>
          <Container>
           <h1 style={{color: 'white', textAlign: 'center' }}>Search Books</h1>
          </Container>
          <Form.Group className="mt-4 mb-4 ml-5 mr-5">
           <Form.Control size="lg" type="text" placeholder="Type the title or the author..." />
         </Form.Group>
         </Jumbotron>
         <BooksList />
        </div>
        );
    }
}

export default SearchBooks;