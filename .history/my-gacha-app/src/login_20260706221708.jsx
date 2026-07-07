import React from 'react';
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

import sparklecat from "./assets_p2/sparklecat.PNG"
import { Turnstile } from '@marsidev/react-turnstile'
import Dashboard from './dashboard.jsx'
import Signup from './signup.jsx'

//export allows it to be imported in other files
//default means that it is the main (can only hv one) thingy of the file so no curly braces !

export default function Login() {
    const [captchaToken, setCaptchaToken] = useState()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("login");
    const[processing, setProcessing] = useState(false);

    async function handleLogin(e) {
        setProcessing(true)
        //e only for forms :3
        e.preventDefault();
        if (!username || !password){
            toast.error("Missing Fields");
            setProcessing(false)
            return;
        }
        if (!captchaToken) {
            toast.error("Complete your captcha first!");
            setProcessing(false)
            return;
        }
        {/* this makes it so that the form doesnt refresh and lose all data
        only grab the value of error*/}
        const { error } = await supabase.auth.signInWithPassword(
            {
                email: `${username}@default.com`,
                password: password,
                options: {captchaToken},
            }
        )
        if (error) {
            toast.error(error.message)
            setCaptchaToken(null);
            setProcessing(false)
        } else {
            toast.success("Welcome back!")
            setTimeout(() => {
                setPage("dashboard")
                setProcessing(false)
            },1500)
        }
    }
    return (
        <>
            {page == "login" && 
            <div  className = "center" >
            <Toaster className = "toaster"/>
            <div className = "patcher">
                <h1 className = "maintext" > login page</h1>
                <img style = {{height: '300px', width: '300px', objectFit: 'cover'}} className = "patch" src = {sparklecat}/>
            </div>
            <form onSubmit={handleLogin} className = "form">
                {/* different types are text,email,number,checkbox,password*/}
                {/*so target is where it happened (in the input box) and value is its value
                no comments inside tags!*/}
                <input
                    disabled = {processing}
                    className = "inputs"
                    type="text"
                    minLength={1}
                    maxLength={36}
                    placeholder="enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    disabled = {processing}
                    className = "inputs"
                    type="password"
                    minLength={1}
                    maxLength={36}
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {captchaToken != null && 
                <>
                    <Turnstile
                        className = "turnstile"
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {setCaptchaToken(token)}}
                        onExpire = {() => setCaptchaToken(null)}
                        onError = {() => {
                            toast.error("captcha failed.");
                            setCaptchaToken(null);
                        }}
                    />
                </>}
                {captchaToken == null && 
                <>
                    <Turnstile
                        className = "turnstile"
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {setCaptchaToken(token)}}
                        onExpire = {() => setCaptchaToken(null)}
                        onError = {() => {
                            toast.error("captcha failed.");
                            setCaptchaToken(null);
                        }}
                    />
                </>}
                <button disabled = {processing} className = "buttons_normal" type="submit" >Let's go!</button>
            </form>
            <button disabled = {processing} className = "accent_button"  type = "button" onClick ={() => setPage("signup")}>Sign up?</button>
            <div style = {{paddingBottom: '40px'}}>
            </div></div>
            }
            {page == "signup" && <Signup />}
            {page == "dashboard" && <Dashboard/>}
        </>
        
    );
}