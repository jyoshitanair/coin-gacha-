import React, { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast'
import Library from './library.jsx'
//supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Library({uuid}) {
    return(
        <p> hi!</p>
    );
}