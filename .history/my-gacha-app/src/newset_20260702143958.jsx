import React, {useState, useEffect} from 'react';
export default function Newset() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [flascardNumber, setFlascardNumber] = useState(0);
    //functiones
    function logFlashcards(){
        <p> hi!</p>
    }
    function newTerm(){
        <p> hi!</p>
    }
return(
    <div>
    <form onSubmit = {logFlashcards}>
        <input
            disabled = {processing}
            type  = "text"
            minLength = {1}
            maxlength = {50}
            placeholder = "enter title"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
        />
        <input
            disabled = {processing}
            type  = "text"
            minLength = {1}
            maxlength = {50}
            placeholder = "enter description"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
        />
        <h1> Terms</h1>
        <div key = {flascardNumber}> 
          <div  key = {pull.id} className = "grid_item">
                                    <p className = "smallp">GachaID: {pull.gacha_id}</p>
                                    <p className = "smallp">Rarity: {pull.rarity}/5</p>
                                    <img className = "small_img" src = {pull.img}/>
                            </div>  
        </div>
        <button type = "button" onClick = {newTerm}> New Term</button>
        <button type = "submit"> Create!</button>
    </form>
    </div>
);
}
