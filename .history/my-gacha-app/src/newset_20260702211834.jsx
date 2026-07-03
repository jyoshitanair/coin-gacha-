import React, { useState, useEffect } from 'react';
export default function Newset(uuid) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [flashcardNumber, setFlashcardNumber] = useState(0);
    //functiones
    function logFlashcards() {
        <p> hi!</p>
    }
    function newTerm() {
        <p> hi!</p>
    }
    function reRenderCards() {
        for (let i = 1; i <= flashcardNumber; i++) {
            <div>
                <h5> Flashcard # {i}</h5>
                <p> Term:</p>
                <p> Term:</p>
            </div>
        }
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
                <div key={flashcardNumber}>
                    {
                        reRenderCards()
                    }
                </div>
                <button type="button" onClick={newTerm}> New Term</button>
                <button type="submit"> Create!</button>
            </form>
        </div>
    );
}
