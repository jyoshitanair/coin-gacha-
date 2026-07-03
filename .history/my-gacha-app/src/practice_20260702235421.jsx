import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({item}) {
    console.log(item)
    return(
        <div>
            <div>
                <h1> {item.title} by {item.user}</h1>
                <h3> {item.description}</h3>
            </div>
            <div>
                {item.flashcardData && item.flashcardData.map(card => (
                   <>
                    <p> Term: {card.term}</p> 
                   <p> Definition: {card.definition}</p>
                   </> 
                ))}
            </div>
        </div>
    );
}