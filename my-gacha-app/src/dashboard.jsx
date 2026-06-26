import React from 'react';
import {useState} from 'react';
import Gamble from './gamble.jsx'
import Flashcards from './flashcards.jsx'


export default function Dashboard() {
    const [page, setPage] = useState("dashboard");
    return(
        <>
        {page == "dashboard" && 
            <>
            <p> welcome to the app</p>
            <button onClick={() => setPage("gamble")}> Gamble</button>
            <button onClick = {() => setPage("flashcards")}> Flashcards</button>
            </>
        }
        {page == "gamble" && <Gamble />}
        {page == "flashcards" && <Flashcards />}
        </>
    );
}
