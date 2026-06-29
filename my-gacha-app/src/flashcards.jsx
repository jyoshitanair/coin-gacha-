import React, {useState, useEffect} from 'react';
import Gamble from './gamble.jsx'
import Dashboard from './dashboard.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Flashcards({uuid}) {
    useEffect(() => {
        updateCoinCount(false);
    }, []);
    async function updateCoinCount(tof) {
        setLoading(true)
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message)
        }else{
            let newCoinCount = 0;
            if (data){
                if(tof == false){
                    newCoinCount = data.coins;
                }else{
                    newCoinCount = data.coins+1;
                }
            }
            const {error} = await supabase.from("coin_data").upsert({uuid: uuid, coins: newCoinCount})
            if (error){
                toast.error(error.message);
                setLoading(false);
                return;
            }
            setCoins(newCoinCount)
            setLoading(false);
        }
    }
    const [page, setPage] = useState("flashcards");
    const [coins, setCoins] = useState(0);
    const [loading, setLoading] = useState(false);
    return(
    <>
        {page == "flashcards" && <>
            <Toaster/>
            <h1 class = "smallh1"> Get more Coins </h1>
            <p> Total Coins : {coins}</p>
            <p> here is a button that increases your coins!</p>
            <button disabled = {loading} className = "accent_button" onClick={() => updateCoinCount(true)}> Coin Clicker!</button>
            <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("gamble")}> Gamble</button>
            <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("dashboard")}> Dashboard</button>
        </>}
        {page == "dashboard" && <Dashboard/>}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
    </>
    );
}