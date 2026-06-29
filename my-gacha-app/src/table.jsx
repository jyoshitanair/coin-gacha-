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
    const [pageNumber, setPageNumber] = useState(1)
    const [disabled, setDisabled] = useState(false)
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
    //setting up page returning
    const lastItemIndex = pageNumber *9;
    const currentPulls = calculatePulls();
    const totalPages = calculatePages();
    useEffect(() => {
        if(pageNumber == totalPages){
            setDisabled(true);
        }
    },[pageNumber])
    function calculatePages() {
        if(pulls){
            return Math.ceil((pulls.length)/9) //always need to round up a page
        }else{
            return 1; 
        }
    }
    function calculatePulls() {
        if(pulls){
            //slices at a start and end
            //pulls alr filtered to only show UR pulls
            return pulls.slice(pageNumber,lastItemIndex)
        }else{
            return [];
        }
    }
    
    return(
        <>
            {loading == true &&
                <>
                    <p> Loading... </p>
                </>
            }
            {page == "table" && loading == false &&
                <>
                    <div className = "grid_container">
                        {pulls && pulls.map((pull) => (
                            <div className = "grid_item">
                                <tbody>
                                    <tr>{pull.gacha_id}</tr>
                                    <tr>{pull.rarity}</tr>
                                    <tr><img className = "small_img" src = {pull.img}/></tr>
                                </tbody>
                            </div>))}
                    </div>
                    <button className = "buttons_normal" disabled = {disabled}>Next</button>
                        
                        
                </>
            }
            {page == "gamble" && <Gamble uuid = {uuid}/>}
        </>
    );
}