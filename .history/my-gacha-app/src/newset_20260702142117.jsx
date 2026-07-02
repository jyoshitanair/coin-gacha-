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
            placeholder = "enter title"
            value = {title}
            onChange = {(e) => setPassword(e.target.value)}
            />
    </form>
    </div>
);
}
