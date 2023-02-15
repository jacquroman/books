import React from 'react';
import {useState} from 'react';
import BookEdit from './BookEdit';

const BookShow = ({book, onDelete, onEdit}) => {
    const [showEdit, setShowEdit] = useState(false);



    const handleDeleteClick = (event) =>{
        // since we are looking at the cards of books, in book show we are looking at each book individually , and when we click on the delete button , since this component already has access to the book
        //the book state we can just pass in the book id like so and it will pass it back up through to the app.js component
        onDelete(book.id);
    }


    //we make ONE handle submit function with that should handle all the functions we want in the parent and we pass that down to the child for the props to get put in and this method to 
    //be called upon submit
    const handleSubmit = (id, newTitle) => {
        setShowEdit(!showEdit);
        onEdit(id, newTitle);
    }

 

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    let content = <h3>{book.title}</h3>;

    if(showEdit){
        content = <BookEdit book ={book} onSubmit={handleSubmit} />;
    }

    return (
        <div>
            <div className="book-show">
                <img
                    alt="books"
                    src = {`https://picsum.photos/seed/${book.id}/300/200`}
                />
                <div>{content}</div>
                <div classsName="actions">
                    <button className="edit" onClick={handleEditClick}>Edit</button>
                    <button className="delete" onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookShow; 


///WE DON"T WANT TO DIRECTLY CALL ON DELETE ON THAT BUTTON  CLICK BECAUSE THE EXPECTATION IS THAT WE WILL PASS IN A PROP AND SO INSTEAD WE PUT A CLICK HANDLER IN AND INSIDE OF THE CLICK HANDLER
//WE WILL THEN HAVE THE ON DELETE FUNCTION CALLED