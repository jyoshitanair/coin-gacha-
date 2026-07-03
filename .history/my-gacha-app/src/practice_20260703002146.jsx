import React, {useState} from 'react';
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
    console.log(item)
    return(
        <div>
            {mode == "learn" && <div> 
                <div>
                    <h1> {item.title} by {item.user}</h1>
                    <h3> {item.description}</h3>
                </div>
                {item.flashcardData &&
                    <>
                        <div>
                            <h5> Term: {item.flashcardData[index].term}</h5>
                            <h5> Definition: {item.flashcardData[index].definition}</h5>
                        </div>
                    </>
                }
            <button disabled = {index == item.flashcardData.length - 1} onClick = {() => {setIndex(prev => (Math.min(item.flashcardData.length-1,prev +1)))}}> Next</button>
            <button disabled = {index == 0} onClick = {() => {setIndex(prev => (Math.max(0,prev -1)))}}> Previous</button>
            <button onClick = {() => {setMode("test")}}> Test </button>
            </div>}
        </div>
    );
}