import React, { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Newset(uuid) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    //term,description
    const [flashcards,setFlashcards] = useState([]);
    //functiones
    function logFlashcards() {
        if(uuid){
            const {data, error} = await supabase.from("flashcards").insert(
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
                }
                if (data){
                    setProcessing(false)
                }
        }else{
            return
        }
    }
    function reRenderCards() {
        const terms = [];
        for (let i = 0; i <= flashcards.length-1; i++) {
            terms.push(
                <div>
                    <h5> Flashcard # {i+1}</h5>
                    <p> Term:</p>
                    <input
                        disabled={processing}
                        type="text"
                        minLength={1}
                        maxlength={50}
                        placeholder="enter term"
                        value = {flashcards[i].term}
                        onChange={(e) => {
                            setFlashcards(prev => {
                                const temp = [...prev];
                                temp[i] = {...temp[i], term:e.target.value};
                                return temp
                            })
                        }}
                    />
                    <p> Definition:</p>
                    <input
                        disabled={processing}
                        type="text"
                        minLength={1}
                        maxlength={50}
                        placeholder="enter definition"
                        value = {flashcards[i].definition}
                        onChange={(e) => {
                            setFlashcards(prev => {
                                const temp = [...prev];
                                temp[i] = {...temp[i], definition:e.target.value};
                                return temp
                            })
                        }}
                    />
                </div>
            )
        }
        console.log(flashcards);
        return terms;
    }
    return (
        <div>
            <Toaster/>
            <form onSubmit={logFlashcards}>
                <h1> New Set:</h1>
                <input
                    disabled={processing}
                    type="text"
                    minLength={1}
                    maxlength={50}
                    placeholder="enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    disabled={processing}
                    type="text"
                    minLength={1}
                    maxlength={50}
                    placeholder="enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h4> Terms</h4>
                <div>
                    {
                        reRenderCards()
                    }
                </div>
                <button type="button" onClick={() => {
                    setFlashcards(prev => [...prev, {term: "", definition: ""}])
                }}> New Term</button>
                <button type="submit"> Create!</button>
            </form>
        </div>
    );
}
