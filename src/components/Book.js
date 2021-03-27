import React from 'react';
import BookShelf from './BookShelf';
import { Image, Button, Card } from 'react-bootstrap';
import rightarrow from '../img/rightarrow.png';

const Book = ({ }) => {
 
    // const bookCover = book.imageLinks ? book.imageLinks.thumbnail : null;

    return (
    <div className="book">
       <Card style={{borderColor: "transparent"}}> 
       <Card.Img className="ml-4" style={{ width: 128, height: 193 }} />
       <Card.Title className="mt-4" style={{fontSize: "18px"}}></Card.Title>
       <Card.Text style={{fontSize: "16px"}}></Card.Text>
       <Card.Body>
         <BookShelf 
          
       />
       </Card.Body>
       </Card>
    </div>    
    );
}

export default Book;