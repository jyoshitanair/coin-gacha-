import React, {useState, useEffect} from 'react';
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({uuid}) {
    //usestate
    const [loading, setLoading] = useState(true)
    const [pulls, setPulls] = useState(null)
    const [page, setPage] = useState("library")
    const [pageNumber, setPageNumber] = useState(1)
    //setting up page returning
    const lastItemIndex = pageNumber *9;
    const firstItemIndex = lastItemIndex-9;
    const currentPulls = calculatePulls();
    const totalPages = calculatePages();
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
            return pulls.slice(firstItemIndex,lastItemIndex);
        }else{
            return [];
        }
    }
    useEffect(() => {
        async function get_pulls(){
        setLoading(true)
        const {data, error} = await supabase.from("flashcards").select('*').eq("user", uuid).order("id", {ascending:false})
        if (error){
            toast.error(error.message)
        }
        if (data){
            setPulls(data)
        }
        setLoading(false)
        }
        get_pulls()
    }, [uuid]) 
    //incase users a spam paging wierd?
    useEffect(() => {
        if (pageNumber > totalPages){
            //better not exceed it!
            setPageNumber(totalPages);
        }
    }, [totalPages,pageNumber])
    
    return(
        <>
            {loading == true &&
                <>
                    <p className = "maintext"> Loading... </p>
                </>
            }
            {page == "library" && loading == false &&
                <div className = "center">
                    <Toaster/>
                    <h1 className = "maintext" > All Pulls</h1>
                    <button 
                    className = "buttons_normal" 
                    onClick = {() => setPage("gamble")}
                    >Gamble</button>
                    <div className = "grid_container">
                        {currentPulls && currentPulls.map((pull) => (
                            <div  key = {pull.id} className = "grid_item">
                                    <p className = "smallp">GachaID: {pull.gacha_id}</p>
                                    <p className = "smallp">Rarity: {pull.rarity}/5</p>
                                    <img className = "small_img" src = {pull.img}/>
                            </div>))}
                    <img className = "shelf" src = {image}/>
                    </div>
                    <button 
                    className = "buttons_normal" 
                    disabled = {pageNumber >= totalPages}
                    onClick = {() => {
                        setPageNumber(prev => (Math.min(prev + 1, totalPages)))
                    }}
                    >Next</button>
                    <button 
                    className = "buttons_normal" 
                    disabled = {pageNumber <= 1}
                    onClick = {() => {
                        setPageNumber(prev => (Math.max(prev - 1, 1)))
                    }}
                    >Previous</button>
                        
                        
                </div>
            }
            {page == "dashboard" && <Gamble uuid = {uuid}/>}
        </>
    );
}