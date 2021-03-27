import React from 'react';
import Book from './Book';

const Shelf = ({ }) => {
    return (
    <div className="shelves">
       <h2>Currently Reading</h2>
       <Book 
        
       />
       <h2>Want To Read</h2>
       <Book 
       
       />
       <h2>Read</h2>
       <Book 
        
       />
    </div>    
    );
}

export default Shelf;