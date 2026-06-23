import React from 'react';
import { useState } from 'react';
//supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


//export allows it to be imported in other files
//default means that it is the main (can only hv one) thingy of the file so no curly braces !

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleLogin(e) {
        e.preventDefault();
        {/* this makes it so that the form doesnt refresh and lose all data
        only grab the value of error*/}
        const { error } = await supabase.auth.signInWithPassword(
            {
                email: email,
                password: password
            }
        )
        if (error) {
            alert(error.message)
        } else {
            alert("Welcome back!")
        }
    }
    return (
        <>
            <p> login page</p>
            <form onSubmit={handleLogin}>
                {/* different types are text,email,number,checkbox,password*/}
                {/*so target is where it happened (in the input box) and value is its value
                no comments inside tags!*/}
                <input
                    type="email"
                    placeholder="..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Let's go!</button>
            </form>
        </>
    );
}