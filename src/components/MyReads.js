import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Jumbotron, Container } from 'react-bootstrap';
import Shelf from './Shelf';
import Book from './Book';
import BookShelf from './BookShelf';
import BookShelfDetails from './BookShelfDetails';
import plus from "../img/plus.png";

// we pass the state from parent as props
// arrow function 
const MyReads = ({ currentlyReading, wantToRead, read, updateBookShelf }) => {
    return (
        <div className="myreads">
           <Jumbotron fluid style={{backgroundColor: 'blue'}}>
             <Container>
              <h1 style={{color: 'white', textAlign: 'center' }}>MyReads</h1>
             </Container>
            </Jumbotron>       
             <Shelf>
               <Book>
                 <BookShelf>
                   <BookShelfDetails>
                       currentlyReading={currentlyReading}
                       wantToRead={wantToRead}
                       read={read}
                       updateBookShelf={updateBookShelf}
                   </BookShelfDetails>
                 </BookShelf>
               </Book>  
             </Shelf>   
            <div className="addbooks-button mt-5">   
              <Link to="/search">
               <Button 
                className="mx-auto d-block" 
                 style={{backgroundColor: 'blue', color: 'white', textAlign: 'right'}}>
                <Image src={plus} height="34" width="30" />
               </Button>
             </Link>
            </div>
        </div>
       );
}
  
export default MyReads;