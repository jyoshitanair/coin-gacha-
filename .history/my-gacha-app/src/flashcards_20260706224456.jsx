import React, {useState, useEffect} from 'react';
import Gamble from './gamble.jsx'
import Dashboard from './dashboard.jsx'
import Newset from './newset.jsx'
import toast, {Toaster} from 'react-hot-toast'
import Library from './library.jsx'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Flashcards({uuid}) {
    const [page, setPage] = useState("flashcards");
    const [coins, setCoins] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        updateCoinCount();
    }, []);
    async function updateCoinCount() {
        setLoading(true)
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message);
            setLoading(false);
        }else{
            let newCoinCount = 0;
            if (data){
                newCoinCount = data.coins;
            }
            const {error: error2} = await supabase.from("coin_data").upsert({uuid: uuid, coins: newCoinCount})
            if (error2){
                toast.error(error.message);
                setLoading(false);
                return;
            }
            setCoins(newCoinCount)
            setLoading(false);
        }
    }
    return(
    <>
        {page == "flashcards" && <div className = "center">
            <Toaster/>
            <h1 style = {{marginBottom: '60px'}} className = "maintext"> Flashcards </h1>
            <p className = "smallp"> meowwww</p>
            <p style = {{marginTop: '0px',padding: '0px'}} className = "otherp"> Total Coins : {coins}</p>
            <div className = "patcher">
                <button disabled = {loading} className = "accent_button" onClick={() => setPage("newset")}> New Set</button>
                <button disabled = {loading} className = "accent_button" onClick={() => setPage("library")}> My Library</button>
                <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("gamble")}> Gamble</button>
                <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("dashboard")}> Dashboard</button>
            </div>
        </div>}
        {page == "dashboard" && <Dashboard/>}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
        {page == "newset" && <Newset uuid = {uuid}/>}
        {page == "library" && <Library uuid = {uuid}/>}
    </>
    );
}