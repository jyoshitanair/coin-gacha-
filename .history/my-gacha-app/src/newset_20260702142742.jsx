import React, {useState} from 'react';
export default function Newset() {
    const [title, setTitle] = useState("");
    const [processing, setProcessing] = useState(false);
    function logFlashcards(){
        <p> hi!</p>
    }
return(
    <div>
    <form className = "form" onSubmit = {logFlashcards}>
        <input
            disabled = {processing}
            className = "inputs"
            type  = "text"
            minLength = {1}
            maxlength = {50}
            placeholder = "enter title"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
        />
        <button type = 
    </form>
    </div>
);
}
