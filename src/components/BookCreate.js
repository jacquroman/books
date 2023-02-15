import React from 'react';
import {useState} from 'react';

const BookCreate = ({onCreate}) => {
    const [title, setTitle] = useState('');

    //call this whenever the user changes the text INPUT!
    const handleChange = (event) =>{
        setTitle(event.target.value);
    };

    const handleSubmit = (event) =>{
        //because this is a form element and when he hit submit we do not want the page to re-fresh, we want to prevent the default
        //this handler also goes inside the FORM element INSTEAD of the button because since you have made a form that includes a button, it is understood by the browser that on click that button will
        //submit the form or if you press enter it will submit the form - so the event onSubmit is coming fom the form! not the clicking of the button?
        event.preventDefault();
        //without this prevent default it actually causes the App component to re-render as well so your console.log in the app component is disappearing
        onCreate(title);

        //this step below is used to clear out the title text in the input but don't worry because setting this state in here causes Book Create to re-render BUT we already passed title up to app so it still has
        //the correct title value before we re-wrote it
        setTitle('');
    }


    return(
        <div className= "book-create">
            <h3>Add a Book</h3>
            <form onSubmit= {handleSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange}/>
                <button className="button">Submit</button>
            </form>
        </div>
    );
}

export default BookCreate;

//input tags inside forms always need to have an onChange prop and a value prop!! The value prop is what turns this into a controlled component and the value prop should have the piece of state that is changing with input
//i.e. what piece of state you are changing when you handleChange on an input
//for input props the component needs a state to keep track of what the user is changing in the inputs