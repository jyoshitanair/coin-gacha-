import React, {useState} from 'react';
import Dashboard from './dashboard.jsx'
import Library from './library.jsx'
import Gamble from './gamble.jsx'
import Flashcards from './flashcards.jsx'
import Practice from './practice.jsx'
import toast, {Toaster} from 'react-hot-toast'

//cats
import hugcat from "./assets_p2/hugcat.PNG"
import sparklecat from "./assets_p2/sparklecat.PNG"
import sadcat from "./assets_p2/sadcat.PNG"
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Done({uuid, right,wrong, item}) {
    const [page, setPage] = useState("done")
    const [processing, setProcessing] = useState(false)
    return(
        <div className = "center">
            {page == "done" && 
            <div> 
                <h1 className = "maintext"> You're done! </h1>
                <div className = "row">
                <div style = {{display: 'flex', alignItems: 'center', width: '70vw', backgroundColor: "#c084fc00",borderColor: "#c084fc00", }} className = "title_details">
                    <p>  <strong> <em> {right} </em></strong>  correct</p>
                    <p> <strong> <em> {wrong} </em></strong> wrong </p>
                    <p> and <strong> <em> {right-wrong} </em></strong>  coin change</p>
                </div>
                {(wrong > right) && 
                <img className = "patchotherway" src = {sadcat}/>
                }
                {(wrong == right) && 
                <img className = "patchotherway" src = {hugcat}/>
                }
                {(wrong < right) && 
                <img className = "patchotherway" src = {sparklecat}/>
                }
                </div>
            <div style = {{ marginTop: '50px', display: 'flex', flexDirection: 'row', gap: '50px', alignItems: 'center'}}>
                <button 
                    disabled = {processing}
                    className = "accent_button" 
                    onClick = {() => setPage("practice")}
                >Try again?</button>
                <button 
                    disabled = {processing}
                    className = "buttons_normal" 
                    onClick = {() => setPage("dashboard")}
                >dashboard</button>

                <button 
                    disabled = {processing}
                    className = "buttons_normal" 
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
            </div></div>}
            {page == "dashboard" && <Dashboard/>}
            {page == "library" && <Practice uuid = {uuid}/>}
            {page == "flashcards" && <Flashcards uuid = {uuid}/>}
            {page == "gamble" && <Gamble uuid = {uuid}/>}
            {page == "practice" && <Practice item = {item}/>}
        </div>
        
    );
}