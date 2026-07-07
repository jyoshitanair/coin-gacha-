import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard.jsx'
import Table from './table.jsx'
import html2canvas from 'html2canvas';
import toast, {Toaster} from 'react-hot-toast'
import Flashcards from './flashcards.jsx'
//image
import image from "./assets_p2/Illustration122.PNG"
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const indexes = {
        accessories:0,
        body: 0,
        eyes: 0,
        hair: 0,
        head: 0,
        mouths: 0,
    }
//getting the images
//eager makes it not lazy and insta load!
const allImages = import.meta.glob('./assets/**/*.PNG',{eager:true});
//obj with name_number: url
const images = Object.fromEntries(
    Object.entries(allImages).map(([path,module]) => {
        const pathParts = path.split('/');
        const folderName = pathParts[2];
        if (indexes[folderName] !== undefined){
            indexes[folderName] += 1
        }
        const finalName = `${folderName}_${indexes[folderName]}`
        return [finalName,module.default]
    }));
export default function Gamble({uuid}) {
    const [processing,setProcessing] = useState(false);
    const [page,setPage] = useState("gamble");
    const [load,setLoad] = useState(0);
    const [coins, setCoins] = useState(0);
    //check the coins 
    useEffect(() => {updateCoinCount()}, [])
    async function updateCoinCount() {
        setProcessing(true);
        const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
        if (error){
            toast.error(error.message)
            setProcessing(false);
            return
        }else{
            let newCoinCount = 0 
            if (data){
                newCoinCount = data.coins;
            }
            const {error} = await supabase.from("coin_data").upsert({uuid: uuid, coins: newCoinCount})
            if (error){
                toast.error(error.message);
                setProcessing(false);
                return;
            }
            setProcessing(false);
            setCoins(newCoinCount)
        }
    }
    //store the img
    useEffect(() => {
        if(load == 6){
            setProcessing(true);
            async function setupdatabase(){
                const img_element = document.getElementById("imgContainer");
                if (!img_element){
                    setProcessing(false);
                    return;
                }
                const canvas = await html2canvas(img_element,{
                    backgroundColor: null,
                    useCORS: true,
                })
                //needed for transparent
                const imgString = canvas.toDataURL('image/png')
                if(uuid){
                    const {error} = await supabase.from("user_pulls").insert(
                        [{
                            user: uuid,
                            gacha_id: gacha.gacha_id,
                            rarity: gacha.rarity,
                            img: imgString
                        }])
                    if (error){
                        toast.error(error.message);
                        setProcessing(false);
                        return;
                    }else{
                        setProcessing(false)
                    }
                }
            }    
            setupdatabase()
        }
        
    }, [load]);
    //dictionary
    const assets = {
        body: [1,2,3,4,5,6,7,8,9],
        head: [1,2,3,4,5,6,7,8,9],
        hair: [1,2,3,4,5,6,7,8,9],
        eyes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        mouths: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        accessories: [1,2,3,4,5,6,7,8,9,10,11]
    };

    const [gacha, setGacha] = useState({
        body: 1,
        head: 1,
        hair: 1,
        eyes: 1,
        mouths: 1,
        accessories: 1,
        rarity: 0,
        gacha_id: 0,
    });
    function percentCalc(points1,percent1,amount) {
        var final = amount
        var start = 1
        if (percent1 <= 92){
            points1 += 3
            var max = Math.floor(amount/4)+1
            amount -= max
            final -= max
        }if (percent1 <= 75){
            points1 -= 2
            var max = Math.floor(amount/2)+1
            final -= max
        }if(percent1 > 92){
            points1 += 5
        }
        // 1-5, 1-3,1
        var index = Math.floor(Math.random() *(final-start+1))+start
        return [index,points1]
    }
    //must be because inside it is an await
    async function createChar() {
        if (processing || coins<10){
            return
        }
        setProcessing(true);
        setLoad(0)
        var digit = 1
        var points = 0
        var newChar = {}
        var index = 0  //desired value
        newChar["gacha_id"] = 0
       Object.keys(assets).forEach((category) => {
            //math random returns randf from 0-1
            const percent = Math.random()*100.0
            //these have 9 !
            if((category == "body") || (category == "head") || (category == "hair")){
                var calc = percentCalc(points,percent,9) 
            }
            //these have 11 !
            if((category == "accessories")){
                var calc = percentCalc(points,percent,11) 
            }
            //these have 20 !
            if((category == "eyes") || (category == "mouths")){
                var calc = percentCalc(points,percent,20) 
            }
            index = calc[0]
            points = calc[1]
            newChar[category] = index
            newChar["gacha_id"] += (index*digit)
            digit *= 10
       });
       var rarity = Math.floor(((points - 6)*5)/18)+1
       if (rarity >= 5){
            rarity = 5
       }
       if (rarity <= 0){
            rarity = 1
       }
       newChar["rarity"] = rarity
       setGacha(newChar)
       //subtract from db 
       async function subtractCoins() {
            const {data, error} = await supabase.from("coin_data").select('coins').eq("uuid", uuid).maybeSingle() //return an object not array and null if nothing
            if (error){
                toast.error(error.message);
                setProcessing(false);
                return;
            }else{
                let newCoinCount1 = 0 
                if (data){
                    newCoinCount1 = data.coins - 10;
                }
                const {error} = await supabase.from("coin_data").upsert({uuid: uuid, coins: newCoinCount1})
                if (error){
                    toast.error(error.message);
                    setProcessing(false);
                    return;
                }
                setProcessing(false);
                setCoins(newCoinCount1)
            }
        }
        subtractCoins()

    };
    return(
    <>
        {page == "gamble" && 
        <div className = "center">
        <Toaster/>
        <h1 style = {{padding: '30px'}} className = "maintext"> gamble </h1>
        <p style = {{padding: '80px'}} className = "otherp"> Coins: {coins} </p>
        <div style = {{marginTop: '-100px'}} className = "patcher">
            <img className = "gumballimg" src = {image}/>
            <button className = "special_button buttons_normal" disabled = {processing || (coins<10)} onClick = {() => createChar()}> {coins <10? "Insufficent Funds":"Roll(10 Coins)"} </button>
            <button className = "special_button buttons_normal"  disabled = {processing} onClick = {() => setPage("dashboard")}> Dashboard</button>
            <button className = "special_button buttons_normal" disabled = {processing} onClick = {() => setPage("flashcards")}> Get More Coins?</button>
            <button className = "special_button accent_button" disabled = {processing} onClick = {() => setPage("table")}> View All Rolls </button>
        </div>
        {gacha.rarity != 0 &&
            <div id = "p_combined">
                <p >Congrats you rolled #{gacha.gacha_id}</p>
                <p>Rarity: {gacha.rarity}/5</p>
            </div>
        }
        <div id = "fattest_div">
            {processing && coins>=10 &&
            <>
                <div id = "imgContainer" key = {gacha.id}>
                    <img src = {images[`body_${gacha.body}`]} className = "body_img" onLoad={() => setLoad(prev => prev +1)}/>
                    <img src = {images[`accessories_${gacha.accessories}`]} className = "accessories_img" onLoad={() => setLoad(prev => prev +1)}/>
                    <img src = {images[`eyes_${gacha.eyes}`]} className = "eyes_img" onLoad={() => setLoad(prev => prev +1)}/>
                    <img src = {images[`hair_${gacha.hair}`]} className = "hair_img" onLoad={() => setLoad(prev => prev +1)}/>
                    <img src = {images[`head_${gacha.head}`]} className = "head_img" onLoad={() => setLoad(prev => prev +1)}/>
                    <img src = {images[`mouths_${gacha.mouths}`]} className = "mouths_img" onLoad={() => setLoad(prev => prev +1)}/>
                </div>
            </>
            }
            {gacha.rarity != 0 &&
            <>
                <div id = "imgContainerdup">
                    <img src = {images[`body_${gacha.body}`]} className = "body_img"/>
                    <img src = {images[`accessories_${gacha.accessories}`]} className = "accessories_img"/>
                    <img src = {images[`eyes_${gacha.eyes}`]} className = "eyes_img"/>
                    <img src = {images[`hair_${gacha.hair}`]} className = "hair_img"/>
                    <img src = {images[`head_${gacha.head}`]} className = "head_img"/>
                    <img src = {images[`mouths_${gacha.mouths}`]} className = "mouths_img"/>
                </div>  
            </>}
        </div>
        </div>}
        {page == "dashboard" && <Dashboard/>}
        {page == "table" && <Table uuid = {uuid}/>}
        {page == "flashcards" && <Flashcards uuid = {uuid}/>}
    </>
    );
}