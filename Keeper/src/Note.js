import React from "react";
import "./styles1.css";

function Note(props){
    function handleClick(){
        props.onDelete(props.id)
    }
    return(
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button className="delete-button" onClick={handleClick}>DELETE</button>
        </div>
    );
}
export default Note;
