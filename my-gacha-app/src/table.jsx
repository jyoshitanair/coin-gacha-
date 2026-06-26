import React, {useState} from 'react';
import Gamble from './gamble.jsx'

export default function Table() {
    const [page, setPage] = useState("table")
    return(
        <>
            {page == "table" && 
                <>
                    <p> hi! </p>
                    <button onClick={() => setPage("gamble")}>gamble</button>
                </>
            }
            {page == "gamble" && <Gamble/>}
        </>
    );
}