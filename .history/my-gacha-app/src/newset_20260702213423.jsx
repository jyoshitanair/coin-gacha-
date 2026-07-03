import React, { useState, useEffect } from 'react';
export default function Newset(uuid) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [flashcardNumber, setFlashcardNumber] = useState(0);
    const values_array = [];
    //functiones
    function logFlashcards() {
        <p> hi!</p>
    }
    function reRenderCards() {
        const terms = [];
        for (let i = 1; i <= flashcardNumber; i++) {
            terms.push(
                <div>
                    <h5> Flashcard # {i}</h5>
                    <p> Term:</p>
                    <input
                        disabled={processing}
                        type="text"
                        minLength={1}
                        maxlength={50}
                        placeholder="enter term"
                        onChange={(e) => {}}}
                    />
                    <p> Definition:</p>
                    <input
                        disabled={processing}
                        type="text"
                        minLength={1}
                        maxlength={50}
                        placeholder="enter definition"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            )
        }
        return terms;
    }
    return (
        <div>
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
                <button type="button" onClick={() => setFlashcardNumber(prev => prev +1)}> New Term</button>
                <button type="submit"> Create!</button>
            </form>
        </div>
    );
}
