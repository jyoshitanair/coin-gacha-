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
    console.log(item)
    return(
        <div>
            <div>
                <h1> {item.title} by {item.user}</h1>
                <h3> {item.description}</h3>
            </div>
                {item.flashcardData &&
                    <>
                        let card = (item.flashcardData[index])
                        <div>
                            <h5> Term: {card.term}</h5>
                            <h5> Definition: {card.definition}</h5>
                        </div>
                    </>
                }
            <button onClick = {() => {setIndex(Math.min(item.flashcardData.length-1,prev => (prev +1))}}> Next</button>
            <button onClick = {() => {setIndex(prev => (prev -1))}}> Previous</button>
        </div>
    );
}