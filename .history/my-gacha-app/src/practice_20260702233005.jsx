import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard.jsx'
import toast, {Toaster} from 'react-hot-toast'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({item}) {
    return(
        <div>
            <p> {item}</p>
        </div>
    );
}