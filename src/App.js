import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


const App = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => { 
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);

    };

    useEffect(()=>{
        fetchBooks();
    }, []);


    //updating arrays and objects in react WITH THE STATE SYSTEMrequires you to create a NEW object or array, copying over the data, and then passing that to the state which allows it to re-render, else by
    //modifiying the existing array, react is still looking at the same spot in memory (Bc there is no new spot in memory with a new data object) and then it doesn't re-render because it thinks
    //it's the same object/array !!! if it is NOT an array or object, then you can just do setState and you won't have issues
    //NOTE: you can still modify arrays and objects normally in React BUT when they are arrays or objects using the STATE system THIS is when the memory thing/creating a new object/array applies
    //usually Ids are generated by a back end server but we don't have that so we need to generate our own unique ids
    const createBook = async (title) =>{

        //ALWAYS have to have await and async for API requests because they are asynchronous
        //these API requests below are to update the local database
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        console.log(response);


        const updatedBooks=[
            ...books,
            response.data
        ];
        setBooks(updatedBooks);
        console.log(updatedBooks);
    };

    const editBookById = (id, newTitle) =>{

        const updatedBooks = books.map((book) => {
            if(book.id === id){
                //REMEMBER YOU HAVE TO MAKE A NEW  OBJECT that takes ALL The exisitng properties from the original book (Spread operator) and then puts the new title in
                return {...book, title: newTitle}
            }
            //else do nothing and just return the book
            return book;
        });

        //then once we exit the mapping function we set the new updated books
        setBooks(updatedBooks);
    };
 

    //the built in JS filter funciton is the one we use to map/for each over an array and remove items we don't want, you pass it in (entry) and for each entry you can write your comparison
    //if the condition is true it will put it in the array, if it is false it will not put it in the new array
    //FILTER method DOES NOT MODIFY EXISTING ARRAY -- it instead CREATES A NEW ARRAY with all the existing elements that passed into it
    const deleteBookById = (id) =>{
        const updatedBooks = books.filter((book)=>{
            return book.id !== id;
        })
        setBooks(updatedBooks);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
            <BookCreate onCreate={createBook}/>
        </div>
    );
}

// class App extends React.Component {
//     render(){
//         return <div>App</div>;
//     }
// }

export default App;