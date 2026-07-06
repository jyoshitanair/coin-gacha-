import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard.jsx'
import Library from './practice.jsx'
import Gamble from './gamble.jsx'
import Flashcards from './flashcards.jsx'
import toast, {Toaster} from 'react-hot-toast'

//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Practice({uuid, right,wrong}) {
    return(
        <div>
            <p> {right} </p>
            <p> {wrong} </p>
            
            <div style = {{ display: 'flex', flexDirection: 'row', gap: '50px', alignItems: 'center'}}>
                {page == "done" && 
                <div> 
                    <button 
                        disabled = {processing}
                        className = "buttons_normal" 
                        onClick = {() => setPage("dashboard")}
                    >dashboard</button>

                    <button 
                        disabled = {processing}
                        className = "accent_button" 
                        onClick = {() => setPage("flashcards")}
                    >flashcards</button>
                            
                    <button 
                        disabled = {processing}
                        className = "buttons_normal" 
                        onClick = {() => setPage("library")}
                    >library</button>
                    <button 
                        disabled = {processing}
                        className = "buttons_normal" 
                        onClick = {() => setPage("gamble")}
                    >gamble</button>
                <div>}
                {page == "dashboard" && <Dashboard/>}
                {page == "practice" && <Practice item = {practice2}/>}
                {page == "flashcards" && <Flashcards uuid = {uuid}/>}
                {page == "gamble" && <Gamble uuid = {uuid}/>}
            </div>
        </div>
        
    );
}