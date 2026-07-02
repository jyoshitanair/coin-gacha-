import React, {useState} from 'react';
export default function Newset() {
    
return(
    <div>
    <form className = "form" onSubmit = {}>
        <input
            disabled = {processing}
            className = "inputs"
            type = "password"
            placeholder = "enter password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
    </form>
    </div>
);
}
