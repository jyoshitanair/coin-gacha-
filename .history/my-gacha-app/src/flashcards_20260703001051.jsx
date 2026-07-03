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
        updateCoinCount(false);
    }, []);
    async function updateCoinCount(tof) {
        setLoading(true)
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message);
            setLoading(false);
        }else{
            let newCoinCount = 0;
            if (data){
                if(tof == false){
                    newCoinCount = data.coins;
                }else{
                    newCoinCount = data.coins+1;
                }
            }else{
                //user is null insert new row
                if(tof == true){
                    newCoinCount += 1;
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
    return(
    <>
        {page == "flashcards" && <div className = "center">
            <Toaster/>
            <h1 className = "maintext"> More Coins! </h1>
            <p className = "otherp"> Total Coins : {coins}</p>
            <p className = "mediump"> here is a button that increases your coins!</p>
            <button disabled = {loading} className = "accent_button" onClick={() => updateCoinCount(true)}> Click me!</button>
            <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("newset")}> New Set</button>
            <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("gamble")}> Gamble</button>
            <button disabled = {loading} className = "buttons_normal" onClick={() => setPage("dashboard")}> Dashboard</button>
        </div>}
        {page == "dashboard" && <Dashboard/>}
        {page == "gamble" && <Gamble uuid = {uuid}/>}
        {page == "newset" && <Newset uuid = {uuid}/>}
    </>
    );
}