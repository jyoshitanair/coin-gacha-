import React, {useState} from 'react';
import Gamble from './gamble.jsx'
import Dashboard from './dashboard.jsx'

export default function Flashcards() {
    const [page, setPage] = useState("flashcards")
    return(
    <>
        {page == "flashcards" && <>
            <h1 class = "smallh1"> Flashcards </h1>
            <p> to be put in later...</p>
            <button className = "buttons_normal" onClick={() => setPage("gamble")}> Gamble</button>
            <button className = "buttons_normal" onClick={() => setPage("dashboard")}> Dashboard</button>
        </>}
        {page == "dashboard" && <Dashboard/>}
        {page == "gamble" && <Gamble/>}
    </>
    );
}