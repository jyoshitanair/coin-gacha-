import react from 'react';
import { useState } from 'react';
import Login from './login.jsx'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
import { Turnstile } from '@marsidev/react-turnstile'

export default function Signup() {
    const [page, setPage] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup(e){
        e.preventDefault();
        if (!captchaToken) {
            alert("uh oh. complete your captcha first!")
            return;
        }
        const {error} = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {captchaToken}
            }
        )
        if (error){
            alert(error.message)
        }else{
            alert("Account Created. Being redirected to login page")
            setPage("login")
        }
    }


    return(
        <>
        {page == "signup" && 
        <>
        <h1>Signup</h1>
        <form>
            <input
            type = "email"
            placeholder = "enter email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            />
            <input
            type = "password"
            placeholder = "enter password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
            <button type = "submit" onClick = {handleSignup}> Sign up </button>
        </form>
        <button type = "button" onClick = {( ) => setPage("login")}> Login </button>
         <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            onSuccess={(token) => {setCaptchaToken(token)}}
            onExpire = {() => setCaptchaToken(null)}
            onError = {() => alert("captcha failed. refresh and try again")}
        />
        </>}

        {page == "login" && <Login/>}
        </>
    );
}