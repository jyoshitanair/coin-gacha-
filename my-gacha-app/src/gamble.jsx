import React, { useState } from 'react';

export default function Flashcards() {
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
    function createChar() {
        var points = 0
        var newChar = {}
        var index = 0  //desired value
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
    };
    return(
    <>
        <p> gamble </p>
        <button onClick = {() => createChar()}> pull! </button>
        {gacha.rarity != 0 &&
            <p>Rarity: {gacha.rarity}</p>
        }
    </>
    );
}