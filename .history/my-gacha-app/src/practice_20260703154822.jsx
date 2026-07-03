import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({item}) {
    const [index, setIndex] = useState(0)
    const [mode, setMode] = useState("learn")
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState(false)
    const [coins, setCoins] = useState(0);
    const [page, setPage] = useState("practice");
    useEffect(() => {
        setIndex(0);
    }, [mode]);
    useEffect(() => {
        if (item != null){
            updateCoinCount(false);
        }
        if (item == null) {
            toast.error("no data detected. please go back to the library and try again!")
            setFail(true);
        }
    }, [item]);
    if (fail == true) {
        return(
            <>
            <Toaster/>
            <p className = "maintext"> Uh oh! </p>
            </>
        )
    }
    if (item == null) {
        return(
            <>
            <Toaster/>
            <p className = "maintext"> Loading... </p>
            </>
        )
    }
    async function updateCoinCount(tof) {
        setLoading(true)
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", item.user).maybeSingle() //return an object not array and null if nothing
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
            //becuz i hv two one need to be renamed
            const {error: error2} = await supabase.from("coin_data").upsert({uuid: item.user, coins: newCoinCount})
            if (error2){
                toast.error(error2.message);
                setLoading(false);
                return;
            }
            setCoins(newCoinCount)
            setLoading(false);
        }
        if(tof == true){
            setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))
        }
    }
    return(
        <>
        
        {fail == false && page == "practice" &&
            <>
                <Toaster/>
                <div>
                    <div>
                        <h1> {item.title} by {item.user}</h1>
                        <h3> {item.description}</h3>
                </div>
                {mode == "learn" && <div> 
                    {item.flashcardData &&
                            <>
                                <div>
                                    <h5> Term: {item.flashcardData[index].term}</h5>
                                    <h5> Definition: {item.flashcardData[index].definition}</h5>
                                </div>
                            </>
                        }
                    <button disabled = {(index == item.flashcardData.length - 1) || loading} onClick = {() => {setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))}}> Next</button>
                    <button disabled = {(index == 0) || loading} onClick = {() => {setIndex(prev => (Math.max(0,prev -1)))}}> Previous</button>
                    <button onClick = {() => {setMode("test")}}> Test </button>
                </div>}
                {mode == "test" && <div>
                    {item.flashcardData &&
                            <>
                                <div>
                                    <h5> Term: {item.flashcardData[index].term}</h5>
                                    <h5> Definition: {item.flashcardData[index].definition}</h5>
                                </div>
                            </>
                        }
                    <button disabled = {(index == item.flashcardData.length - 1) || loading} onClick = {() => {updateCoinCount(true)}}> correct</button>
                    <button disabled = {(index == item.flashcardData.length - 1) || loading} onClick = {() => {setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))}}> wrong</button>
                    <button onClick = {() => {setMode("learn")}}> Learn </button>
                </div>}
            </div>
        </>
        }
        {page == "library" && <Library/>}
        {page == "dashboard" && <Dashboard/>}
    </>
    );
}