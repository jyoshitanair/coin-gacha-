import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard.jsx'
import toast, {Toaster} from 'react-hot-toast'
import Library from './library.jsx'
import Done from './done.jsx'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Practice({item}) {
    const [index, setIndex] = useState(0)
    const [mode, setMode] = useState("learn")
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState(false)
    const [coins, setCoins] = useState(0);
    const [page, setPage] = useState("practice");
    const [buttonText, setButtonText] = useState(false);
    const [right, setRight] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [username, setUSername] = useState(null);
    useEffect(() => {
        setIndex(0);
    }, [mode]);
    useEffect(() => {
        setButtonText(true);
    }, [index, mode]);
    useEffect(() => {
        if (item != null){
            updateCoinCount(1);
            getusername()
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
    async function getusername(){
        setLoading(true);
        const {data, error} = await supabase.auth.getUser();
        if (error){
            toast.error(error.message);
            setLoading(false);
        }
        if (data){
            setUSername(data.email)
        }

    }
    async function updateCoinCount(tof) {
        setLoading(true)
        if (tof != 3){
            const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", item.user).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message);
            setLoading(false);
        }else{
            let newCoinCount = 0;
            if (data){
                if(tof == 1){
                    newCoinCount = data.coins;
                }else{
                    newCoinCount = data.coins+1;
                }
            }else{
                //user is null insert new row
                if(tof == 2){
                    newCoinCount += 1;
                }
            }
            //becuz i hv two one need to be renamedX
            const {error: error2} = await supabase.from("coin_data").upsert({uuid: item.user, coins: newCoinCount})
            if (error2){
                toast.error(error2.message);
                setLoading(false);
                return;
            }
            setCoins(newCoinCount)
            setLoading(false);
        }
        }
        setLoading(false)
        if(tof == 2 || tof == 3){
            if (index == item.flashcardData.length -1){
                toast.success("yayyyy you finished!")
                setTimeout(() => {
                    setLoading(true)
                    setPage("done")
                },1500)
            }else{
                setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))
            }
        }
        if(tof == 2){
            setRight(prev => prev + 1)
        }
        if(tof == 3){
            setWrong(prev => prev + 1)
        }
    }
    return(
        <>
        
        {fail == false && page == "practice" &&
            <>
                <Toaster/>
                <div>
                    <div>
                        <h1  className = "crop" > {item.title} by {item.user}</h1>
                        <h3  className = "crop"> {item.description}</h3>
                        <h3 className = "mediump"> Your coins: {coins}</h3>
                    </div>
                <button className = "buttons_normal" onClick = {() => {setPage("dashboard")}}> Dashboard </button>
                <button className = "buttons_normal" onClick = {() => {setPage("library")}}> Library </button>
                {mode == "learn" && <div> 
                    {item.flashcardData &&
                            <>
                                <div>
                                    <button className = "flashcardito" onClick = {() => {setButtonText(prev => !prev)}}>{buttonText? `Term: ${item.flashcardData[index].term}`: `Definition: ${item.flashcardData[index].definition}` }</button>
                                </div>
                            </>
                    }
                    <button className = "buttons_normal" disabled = {(index == item.flashcardData.length - 1) || loading} onClick = {() => {setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))}}> Next</button>
                    <button className = "buttons_normal" disabled = {(index == 0) || loading} onClick = {() => {setIndex(prev => (Math.max(0,prev -1)))}}> Previous</button>
                    <button className = "buttons_normal" onClick = {() => {setMode("test")}}> Test </button>
                </div>}
                {mode == "test" && <div>
                    {item.flashcardData &&
                            <>
                                <div>
                                    <button className = "flashcardito" onClick = {() => {setButtonText(prev => !prev)}}>{buttonText? `Term: ${item.flashcardData[index].term}`: `Definition: ${item.flashcardData[index].definition}` }</button>
                                </div>
                            </>
                        }
                    <button className = "buttons_normal" disabled = {loading || buttonText} onClick = {() => {updateCoinCount(2)}}> correct</button>
                    <button className = "buttons_normal" disabled = {loading || buttonText} onClick = {() => {updateCoinCount(3)}}> wrong</button>
                    <button className = "buttons_normal" onClick = {() => {setMode("learn")}}> Learn </button>
                </div>}
            </div>
        </>
        }
        {page == "library" && <Library uuid = {item.user}/>}
        {page == "dashboard" && <Dashboard/>}
        {page == "done" && <Done uuid = {item.user} right = {right} wrong = {wrong} item = {item} />}
    </>
    );
}