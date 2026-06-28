import React from 'react';
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
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
            toast.error("uh oh. complete your captcha first!");
            setCaptchaToken(null);
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
            toast.error(error.message)
            setCaptchaToken(null)
        } else {
            toast.success("Welcome back!")
            setPage("dashboard")
        }
    }
    return (
        <>
         <Toaster className = "toaster"/>
         <div  className = "center" >
            {page == "login" && 
            <>
            <h1 className = "maintext" > login page</h1>
            <form onSubmit={handleLogin} className = "form">
                {/* different types are text,email,number,checkbox,password*/}
                {/*so target is where it happened (in the input box) and value is its value
                no comments inside tags!*/}
                <input
                    className = "inputs"
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className = "inputs"
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Turnstile
                className = "turnstile"
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(token) => {setCaptchaToken(token)}}
                onExpire = {() => setCaptchaToken(null)}
                onError = {() => {
                    toast.error("captcha failed. refresh and try again",
                    setCaptchaToken(null))}
                }
                />
                <button className = "buttons_normal" type="submit" >Let's go!</button>
            </form>
            <button className = "accent_button"  type = "button" onClick ={() => setPage("signup")}>Sign up?</button>
            </>
            }
            {page == "signup" && <Signup />}
            {page == "dashboard" && <Dashboard/>}
        </div>
        </>
        
    );
}