import React from 'react';
import { Image, Button, Card } from 'react-bootstrap';

const BookShelfDetails = ({ currentlyReading, wantToRead, read, updateBookShelf, book }) => {
    return (
    <div className="bookshelf-details-update">
     <Button style={{backgroundColor: 'orangered', borderColor: 'transparent'}}>
       <select>
           <option value="move" disabled>Move to...</option>
           <option value="currentlyReading">Currently Reading</option>
           <option value="wantToRead">Want To Read</option>
           <option value="read">Read</option>
           <option value="none">None</option>
       </select>
       </Button>
    </div>    
    );
}

export default BookShelfDetails;