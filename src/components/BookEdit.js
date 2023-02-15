import React from 'react';
import {useState} from 'react';


//ANYTIME YOU HAVE AN INPUT ELEMENT YOU NEED TO KEEP TRACK OF THE VALUE USING A STATE SYSTEM AND USE THE VALUE OF THAT STATE TO CONTROL THE VALUE OF THE INPUT

//even though we have a set title method in book create!!! this method is in a sibling component so we won't have access to it -- one option is to put it in the app or we
//can make a new

const BookEdit = ({book, onSubmit}) => {
    const [title, setTitle] = useState(book.title);


    //YOU ALWAYS NEED TO LINK UP A CHANGE HANDLER FOR INPUT TAGS IN REACT SO THE COMPONENT IS CONTROLLED
    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    //WHENEVER YOU ARE USING A FORM YOU NEED TO HOOK UP AN ON SUBMIT HANDLER AND PREVENT THE DEFAULT REFRESH
    const handleSubmit = (event) => {
        //MOST important line!!!
        event.preventDefault();

        //remember title is the piece of state that the user was changing while they were typing so you plug this in as the new title/value!
        // console.log('New title is: ', title);
        onSubmit(book.id, title);
    }


    return (
        <div>
            <form className="book-edit" onSubmit = {handleSubmit}>
                <label>Title</label>
                <input className="input" value ={title} onChange={handleChange}/>
                <button className="button is-primary">Save</button>
            </form>
        </div>
    )
}

export default BookEdit; 