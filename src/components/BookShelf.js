import React from 'react';
import BookShelfDetails from './BookShelfDetails';

function BookShelf({ currentlyReading, wantToRead, read }) {
    return (
    <div className="shelf">
       <h5>BookShelf</h5>
       <BookShelfDetails 
         currentlyReading={currentlyReading}
         wantToRead={wantToRead}
         read={read}
       />
    </div>    
    );
}

export default BookShelf;