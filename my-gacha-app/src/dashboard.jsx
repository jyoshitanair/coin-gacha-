import React, {useEffect, useState} from 'react';
import Gamble from './gamble.jsx'
import Flashcards from './flashcards.jsx'
import Login from './login.jsx'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Dashboard() {
    const [page, setPage] = useState("dashboard");
    const [uuid, setUuid] = useState(null);
    const [email, setEmail] = useState(null);
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
    return(
        <>
        {page == "dashboard" && 
            <>
            <p> welcome to the app</p>
            <p> This is you! </p>
            <p> Email: {email}</p>
            <p> UUID: {uuid} </p>
            <button onClick={() => setPage("gamble")}> Gamble</button>
            <button onClick = {() => setPage("flashcards")}> Flashcards</button>
            </>
        }
        {page == "login" && <Login />}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
        {page == "flashcards" && <Flashcards />}
        </>
    );
}
