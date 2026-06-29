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
        updateCoinCount(false)
    }, []);
    async function updateCoinCount(tof) {
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message)
        }else{
            let newCoinCount = 1;
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
                return;
            }
            setCoins(newCoinCount)
        }
    }
    const [page, setPage] = useState("flashcards");
    const [coins, setCoins] = useState(0);
    return(
    <>
        {page == "flashcards" && <>
            <Toaster/>
            <h1 class = "smallh1"> Get more Coins </h1>
            <p> Total Coins : {coins}</p>
            <p> here is a button that increases your coins!</p>
            <button className = "accent_button" onClick={() => updateCoinCount(true)}> Coin Clicker!</button>
            <button className = "buttons_normal" onClick={() => setPage("gamble")}> Gamble</button>
            <button className = "buttons_normal" onClick={() => setPage("dashboard")}> Dashboard</button>
        </>}
        {page == "dashboard" && <Dashboard/>}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
    </>
    );
}