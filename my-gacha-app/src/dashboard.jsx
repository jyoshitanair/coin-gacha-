import React, {useEffect, useState} from 'react';
import Gamble from './gamble.jsx'
import Flashcards from './flashcards.jsx'
import Login from './login.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Dashboard() {
    const [page, setPage] = useState("dashboard");
    const [uuid, setUuid] = useState(null);
    const [email, setEmail] = useState(null);
    const [processing, setProcessing] = useState(false)
    //function, array [] = once [dependency], when the dependency changes
    useEffect(() => {
        async function getUser() {
            console.log(await supabase.auth.getUser())
            //takes the data and puts it in the user var
            const {data: {user}} = await supabase.auth.getUser()
            if (user) {
                setUuid(user.id)
                setEmail(user.email)
            }else{
                alert("no user? what!?")
                setPage("login")
            }
        }
        getUser()
    }, []);
    async function Logout() {
            setProcessing(true)
            const {error} = await supabase.auth.signOut()
            if (error){
                toast.error(error.message);
                setProcessing(false)
                return;
            }else{
                toast.success("Logging Out!");
                setTimeout(() => {
                    setPage("login")
                    setProcessing(false)
                },1500)
        }
    }
    return(
        <>
        {page == "dashboard" && 
            <div className = "center">
            <Toaster/>
            <h1 className = "maintext"> welcome to the app</h1>
            <div id = "information">
                <h1 class = "smallh1"> Your Information: </h1>
                <p style = {{padding_left: '40px'}}>Email: {email}</p>
                <p style = {{padding_left: '40px'}}>UUID: {uuid} </p>
            </div>
            <button className = "buttons_normal" disabled = {processing} onClick={() => setPage("gamble")}> Gamble</button>
            <button className = "buttons_normal" disabled = {processing} onClick = {() => setPage("flashcards")}> Flashcards</button>
            <button className = "accent_button" disabled = {processing} onClick={() => Logout()}> Logout</button>
            </div>
        }
        {page == "login" && <Login />}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
        {page == "flashcards" && <Flashcards />}
        </>
    );
}
