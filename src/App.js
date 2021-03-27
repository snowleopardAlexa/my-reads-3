import React, { Component } from 'react';
import MyReads from './components/MyReads';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI';

class App extends Component {
// state - mutating stage
constructor(props) {
  super(props) 
  this.state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };
}

// We need to call the API to getAll Promise from the backend
// In order to do it, we must create a lifecycle method  
// componentDidMount - fetches the data and other initialization stuff
componentDidMount() {
  this.getBooks();
}

// function - we get all the books from the backend
// we filter the books on the shelf - updating the shelf ->
// we share this state between MyReads and SearchBooks
getBooks() {
  {/* returns a promise which resolves to a JSON object containing a collection of book objects */}
  BooksAPI.getAll().then(books => {

    const matchCurrentlyReading = new RegExp(escapeRegExp("currentlyReading"));
    let currentlyReading = books ? books.filter(book => matchCurrentlyReading.test(book.shelf)) : null;

    const matchWantToRead = new RegExp(escapeRegExp("wantToRead"));
    let wantToRead = books ? books.filter(book => matchWantToRead.test(book.shelf)) : null;

    const matchRead = new RegExp(escapeRegExp("read"));
    let read = books ? books.filter(book => matchRead.test(book.shelf)) : null;

// we are re-rendering component now according to the changes
   this.setState({
     currentlyReading,
     wantToRead,
     read,
   })    
  })
}

// updating the book in the shelf
updateBookShelf(book, shelf) {
  BooksAPI.update(book, shelf).then(() => this.getBooks());
}

  render() {
    return (
       <div className="app">
         <Router>

           <Route path="/" exact component>
            {/* we pass the state into another component as prop. */}
             <MyReads 
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              // we need to put this. before because updateBookShelf is inside state
              updateBookShelf={this.updateBookShelf}
             />
           </Route>

           <Route path="/search">
            {/* we pass the state into another component as prop. */} 
             <SearchBooks 
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              updateBookShelf={this.updateBookShelf}
             />
           </Route>

         </Router>
       </div>
    );
  }
}

export default App;
