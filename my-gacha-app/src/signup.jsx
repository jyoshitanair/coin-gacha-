import react from 'react';
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
    const [page, setPage] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup(e){
        e.preventDefault();
        if (!captchaToken) {
            toast.error("uh oh. complete your captcha first!")
            setCaptchaToken(null)
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
            toast.error(error.message)
            setCaptchaToken(null)
        }else{
            toast.success("Account Created. Being redirected to login page")
            setPage("login")
        }
    }


    return(
        <>
        <Toaster className = "toaster"/>
        <div className = "center">
            {page == "signup" && 
            <>
            <h1 className = "maintext">Sign Up</h1>
            <form className = "form">
                <input
                className = "inputs"
                type = "email"
                placeholder = "enter email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                <input
                className = "inputs"
                type = "password"
                placeholder = "enter password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <Turnstile
                className = "turnstile"
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {setCaptchaToken(token)}}
                    onExpire = {() => setCaptchaToken(null)}
                    onError = {() => {
                        toast.error("captcha failed. refresh and try again")
                        setCaptchaToken(null)
                        }
                    }
                />
                <button className = "buttons_normal" type = "submit" onClick = {handleSignup}> Sign up </button>

            </form>
            <button className = "accent_button" type = "button" onClick = {( ) => setPage("login")}> Login </button>
            </>}

            {page == "login" && <Login/>}
        </div>
    </>
    );
}