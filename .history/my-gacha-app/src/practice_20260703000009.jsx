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
            <div>
                {item.flashcardData && () => {
                    let card = (item.flashcardData[index])
                    return(
                        <div>
                            <h5> Term: {card.term}</h5>
                            <h5> Definition: {card.term}</h5>
                        </div>
                    )
                }}
            </div>
        </div>
    );
}