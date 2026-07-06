import React from 'react';
import { useState } from 'react';
import Login from './login.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
import { Turnstile } from '@marsidev/react-turnstile'

export default function Signup() {
    const [captchaToken, setCaptchaToken] = useState()
    const [page, setPage] = useState("signup");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[processing, setProcessing] = useState(false);
    //based off gotrue
    const supabaseUsernameRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
    async function handleSignup(e){
        
        setProcessing(true)
        e.preventDefault();
        if (!username || !password){
            toast.error("Missing Fields");
            setProcessing(false)
            return;
        }
        if (!supabaseUsernameRegex.test(username)){
            toast.error("Sorry. No spaces, '@' or leading/trailing periods allowed");
            setProcessing(false)
            return;

        }
        if (!captchaToken) {
            toast.error("Complete your captcha first!");
            setProcessing(false)
            return;
        }
        const {error} = await supabase.auth.signUp(
            {
                email: `${username}@default.com`,
                password: password,
                options: {captchaToken}
            }
        )
        if (error){
            if (error.message == "Password should be at least 6 characters. Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':\"|<>?,./`~."){
                toast.error("You need: 6+ characters, 1+ lowercase, 1+ uppercase, 1+ number, and 1+ special character.");
            
            }else{
                toast.error(error.message);
            }
            setCaptchaToken(null);
            setProcessing(false)
        }else{
            toast.success("Account Created! Redirecting to login page...")
            setTimeout(() => {
                setPage("login")
                setProcessing(false)
            },1500)
        }
    }


    return(
        <>
            {page == "signup" && 
            <div className = "center">
            <Toaster className = "toaster"/>
            <div className = "patcher" style = {{height: '80vh', marginBottom: '-210px'}}>
                            <h1 className = "maintext" > login page</h1>
                            <img className = "patch" src = {sparklecat}/>
            </div>
            <form className = "form" onSubmit = {handleSignup}>
                <input
                disabled = {processing}
                className = "inputs"
                type = "text"
                minLength={1}
                maxLength={36}
                placeholder = "enter username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                disabled = {processing}
                className = "inputs"
                type = "password"
                minLength={1}
                maxLength={36}
                placeholder = "enter password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
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
                <button disabled = {processing} className = "buttons_normal" type = "submit"> Sign up </button>

            </form>
            <button disabled = {processing} className = "accent_button" type = "button" onClick = {( ) => setPage("login")}> Login </button>
            <div style = {{paddingBottom: '40px'}}>
            </div></div>
            }
            
            {page == "login" && <Login/>}

    </>
    );
}