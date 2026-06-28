import React, {useState, useEffect} from 'react';
import Gamble from './gamble.jsx'

//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Table({uuid}) {
    const [loading, setLoading] = useState(true)
    const [pulls, setPulls] = useState(null)
    const [page, setPage] = useState("table")
    useEffect(() => {
        async function get_pulls(){
        setLoading(true)
        const {data, error} = await supabase.from("user_pulls").select('*').eq("user", uuid).order("id", {ascending:false})
        if (error){
            alert(error.message)
        }
        if (data){
            setPulls(data)
        }
        setLoading(false)
        }
        get_pulls()
    }, []) 
    return(
        <>
            {page == "table" && 
                <>
                    <p> View all your pulls! </p>
                    {loading == true && <p> I'm loading!</p>}
                    {loading == false && 
                    <>
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Rarity</th>
                                <th> Image</th>
                            </thead>
                            <tbody>
                            {pulls && pulls.map((pull) => (
                            <tr>
                                <td> {pull.gacha_id}</td>
                                <td> {pull.rarity}</td>
                                <td> <img className = "small_img" src = {pull.img}/></td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </>}
                    <button onClick={() => setPage("gamble")}>gamble</button>
                </>
            }
            {page == "gamble" && <Gamble uuid = {uuid}/>}
        </>
    );
}