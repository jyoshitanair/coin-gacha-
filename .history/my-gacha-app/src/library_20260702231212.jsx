import React, { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({uuid}) {
    const [loading, setLoading] = useState(false);
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
        setLoading(false)
    }, []) 
    return(
        <p> hi!</p>
    );
}