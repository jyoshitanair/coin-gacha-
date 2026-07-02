import React, {useState, useEffect} from 'react';
export default function Newset(uuid) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [flashcardNumber, setFlashcardNumber] = useState(false);
    //functiones
    function logFlashcards(){
        <p> hi!</p>
    }
    function newTerm(){
        <p> hi!</p>
    }
return(
    <div>
    <form onSubmit = {logFlashcards}>
         <h1> New Set:</h1>
        <input
            disabled = {processing}
            type  = "text"
            minLength = {1}
            maxlength = {50}
            placeholder = "enter title"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
        />
        <input
            disabled = {processing}
            type  = "text"
            minLength = {1}
            maxlength = {50}
            placeholder = "enter description"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
        />
        <h4> Terms</h4>
        <div key = {flashcardArray.length}> 
            {//I literally dont even need flascard -_-}
            flashcardArray.map((flashcard, index) => (
                
            ))}
        </div>
        <button type = "button" onClick = {newTerm}> New Term</button>
        <button type = "submit"> Create!</button>
    </form>
    </div>
);
}
