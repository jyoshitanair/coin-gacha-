import React from 'react';
import { useState } from 'react';

//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

import { Turnstile } from '@marsidev/react-turnstile'
import Dashboard from './dashboard.jsx'
import Signup from './signup.jsx'

//export allows it to be imported in other files
//default means that it is the main (can only hv one) thingy of the file so no curly braces !

export default function Login() {
    const [captchaToken, setCaptchaToken] = useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("login");
    async function handleLogin(e) {
        //e only for forms :3
        e.preventDefault();
        if (!captchaToken) {
            alert("uh oh. complete your captcha first!")
            return;
        }
        {/* this makes it so that the form doesnt refresh and lose all data
        only grab the value of error*/}
        const { error } = await supabase.auth.signInWithPassword(
            {
                email: email,
                password: password,
                options: {captchaToken},
            }
        )
        if (error) {
            alert(error.message)
        } else {
            alert("Welcome back!")
            setPage("dashboard")
        }
    }
    return (
        <>
            {page == "login" && 
            <>
            <p> login page</p>
            <form onSubmit={handleLogin}>
                {/* different types are text,email,number,checkbox,password*/}
                {/*so target is where it happened (in the input box) and value is its value
                no comments inside tags!*/}
                <input
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Let's go!</button>
            </form>
            <button type = "button" onClick ={() => setPage("signup")}>Sign up?</button>
            <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(token) => {setCaptchaToken(token)}}
                onExpire = {() => setCaptchaToken(null)}
                onError = {() => alert("captcha failed. refresh and try again")}
            />
            </>}
            {page == "signup" && <Signup />}
            {page == "dashboard" && <Dashboard/>}
        </>
    );
}