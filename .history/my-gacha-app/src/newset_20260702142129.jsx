import React, {useState} from 'react';
export default function Newset() {
    const [title, setTitle] = useState("");
    const [processing, setProcessing] = useState(false);
return(
    <div>
    <form className = "form" onSubmit = {}>
        <input
            disabled = {processing}
            className = "inputs"
            type  = "text"
            minLength = {1}
            maxlength = {}
            placeholder = "enter title"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
            />
    </form>
    </div>
);
}
