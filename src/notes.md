### NOTES ### 
# PLANNING THE APP #

App.js
BooksAPI.js
-- src 
--- views
   MyReads.js
   SearchBooks.js
--- components
   Book.js
   BooksList.js
   BookShelf.js
   BookShelfDetails.js
   Shelf.js
--- img
   back-arrow.png
   plus.png
   rightarrow.png

# ACCESSING, GETTING, MODIFYING, SHOWING DATA #
# Determine the DATA each component needs #

1. App.js

ACCESING pages MyReads.js and SearchBooks.js through navigation —> 
A user clicks the plus icon circle button -> the user goes to SearchBooks page —> React Router.


SHOWING Header MyReads and navigation button plus icon inside the circle —> bootstrap, css.

GETTING Backend Server ‘BooksAPI.js’ —> the backend contains methods that are necessary to perform 
operations on the backend. We need to use ‘getAll’ and ‘update’ methods here. —> When writing 
React apps, it’s recommended that we MOVE SHARED STATES BETWEEN CHILD COMPONENTS 
INTO THEIR PARENT COMPONENT —> LIFTING STATE UP. We want to do it , so we don’t have to duplicate the processing of data in child components, and we only have a SINGLE
SOURCE OF TRUTH.

 - getAll - returns a promise which resolves to a JSON object containing a collection of book objects.
 - update (book, shelf) —> book: <Object> containing at min an ‘id’ attribute. —> shelf: <String>
contains one of [“wantToRead”, “currentlyReading”, “read”] —> returns a promise which resolves 
to a JSON object containing the response data of the POST request.

MODIFYING State —> class component —> the component has the idea of the “state”, as well as component lifecycle
methods. 

class App extends React.Component {
  constructor( ) {
       super( )
       this.state = {
             currentlyReading: [ ],
             wantToRead: [ ],
             read: [ ],
}; 
--> modyifying/mutating the state

- Inside the lifecycle methods we handle asynchronous code. We use componentDidMount( ) - used mostly for data fetching 
and other initialization stuff. It is called once in a lifecycle. Before the execution of this method the render method is called. 
The method can be used to update the component with new state when a PROMISE RESOLVES. 

componentDidMount( ) {
     this.getBooks( );
}

- we call API - the then( ) method returns a Promise. It takes two arguments: callback functions for the success and failure cases
of the Promise. The Promise object, in turn, is defined as. The Promise object, in turn, is definded as. The Promise object 
is used for deferred and async computations. 

getBooks( ) {
  BooksAPI.getAll( ).then(books => {
  … 
}

this.setState({
  currentlyReading,
  wantToRead,
  read,
});

—> we use this.setState to track changes in state and re-render the component with changes.
We need to use setState, because after it, the render function is triggered —>
LIFECYCLE:  constructor (modifying the state) —> setState ( track changes in the state and re-render the component
with changes) —> render function is triggered —> componentDidMount. 
1. constructor
2. setState
3. render
4. componentDidMount

- we call API - the then( ) method returns a Promise. It takes two arguments: callback functions for the success and failure cases
of the Promise. The Promise object, in turn, is defined as. The Promise object, in turn, is definded as. The Promise object 
is used for deferred and async computations. 

// updating the book in the shelf 
updateBookShelf(book, shelf) {
   BooksAPI.update(book, shelf).then(( ) => this.getBooks( ));
}  

- render( ) {
  const { currentlyReading, wantToRead, read } = this.state; 
} —> destructuring variable. 

- return (
  <MyReads
     <Router>
          {/* React Router 5 */}
          <Route path="/" exact component>
            <MyReads 
            // we pass the state into another component as prop. 
             currentlyReading={this.state.currentlyReading}
             wantToRead={this.state.wantToRead}
             read={this.state.read}
            />
          </Route>

          <Route path="/search">
            <SearchBooks 
            // we pass the state into another component as prop. 
             currentlyReading={this.state.currentlyReading}
             wantToRead={this.state.wantToRead}
             read={this.state.read}
            />
          </Route>
      </Router>
  />
)

# HOW TO PASS THE STATE INTO ANOTHER COMPONENT AS PROP #

class ParentComponent extends Component {
    state = {
        // ...
    }
    render() {
        return <ExampleComponent data={this.state}>
    }
} 

Then inside the <ExampleComponent /> you can access the data as this.props.data

2. SearchBooks.js 

SHOWING search-form and left arrow icon button to the user. 

ACCESING the state from App.js component via props --> this.props.data -->
to update the book on the shelf --> state shared between components MyReads.js and 
SearchBooks.js.

SHOWING BooksList.js component to the user. 

GETTING Backend Server 'BooksAPI' --> the backed methods that are necessary to perfom 
operations on the backend. We need to use 'search' method here. 
- search(query, maxResults) - search results are capped at 20, even if this is set 
higher --> returns a promise which resolves to a JSON object containing a collection
of book objects --> these books do not know which shelf they are on. They are raw results only. The mbook must have correct state while on the search page. 

GETTING SEARCH_TERMS via Regex or PropTypes. 

class SearchBooks extends Component {
    constructor() {
        super()
        // we are mutating the state here
        this.state = {
            bookslist: [], --> we want to get array of objects (bookslist)
            query: ''
        };
    }
}

// we need to search for the query in the backend
// if we want to re-render the state with changes, we need to use this.setState
// we call the promise
// we use TERNARY OPERATOR - if statement equivalent - ? :
handleUpdatedQuery(query) {
    BooksAPI.search(query).then(bookslist => bookslist ? this.setState({ bookslist }) : []);
    this.setState({query});
}

// we need to show search results
showSearchResults() {
 // destructuring variable
 const { bookslist, query } = this.state;

// we need to show booklist component 
 // ternary operator ? : instead of if else
if (query) {
    return bookslist.error ? 
    <h2 className="ml-4">No results found</h2> : 
    bookslist.map((booklist, index) => {
        return (
            <div className="ml-5">
              <BooksList
               key={index}
               book{book}
               handleBookShelf
              
              />
            </div>
        )
    })
}

// we need to display title, form group, form control, and search results --> booklist
 render() {
        return (
           <div className="searchbooks">
            <Jumbotron fluid style={{backgroundColor: "#CC00FF"}}>
             <Link to="/" className="close-search">
             <Image className="ml-4" src={backarrow} height="44" width="54" />
             </Link>
             <Container className="mt-5">
             <h1 style={{color: "white"}}>Library</h1>
             <Form.Group className="mt-4">
              <Form.Control 
                value={this.state.query}
                onChange={e => this.handleUpdatedQuery(e.target.value)}
                size="md" 
                type="text" 
                placeholder="Search by Author, Title..." 
              />
             </Form.Group>
             </Container>
            </Jumbotron>
            <div className="library">
                <CardColumns className="my-auto">
                  {this.displaySearchResults()}
                </CardColumns>
            </div>
           </div>
        );
    }
}

INVERSE DATA FLOW:
It allows us to send data between parent and child components as props,
or properties. However, components that are cousins or siblings cannot directly
communicate with each other.

Sharing data between parent and child components -->
An example of INVERSE DATA FLOW between a parent component and a child
component.

class Home extends Component {
    // the state is mutated here
    state = {
        email_address: ''
    }

    // FUNCTION that we send down as PROPS to its child components
    handleChange = (inputFromChild) => {
    // the state returns with a change
        this.setState({
            email_address: inputFromChild
        })
    }

    handleResponse = (event) => {
        event.preventDefault()
        console.log("Something has been done")
    }

    render() {
        return (
            // Child component - the information inputted by the user in this
            // component is then sent back up to the parent component by invoking
            // those very same functions. This allows us to "reuse" these functions
            // without having to copy and paste the same code in both of the child
            // components.
            <CreateAccountForm
             handleChange={this.handleChange}
             handleResponse={this.handleResponse}
            />
            // Child
            <AccountSettings
             handleChange={this.handleChange}
             handleResponse={this.handleResponse}
            />
        )
    }
}

Limitations of Inverse Data Flow:
- it is great to write DRY code, but it is rstrictive too.
- Components that do not have a direct parent or child relationship
cannot share props with each other.
- PROPS DRILLING can become cumbersome and confusing to follow if there
are several components with complex relationships. 