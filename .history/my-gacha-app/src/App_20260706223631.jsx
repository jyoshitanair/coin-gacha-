import {easeInOut, motion} from 'framer-motion'
import { useState } from 'react'
import './App.css'

import Login from './login.jsx'
import Signup from './signup.jsx'
//img
import hugcat from "./assets_p2/hugcat.PNG"
import sparklecat from "./assets_p2/sparklecat.PNG"
import wavecat from "./assets_p2/wavecat.PNG"
import sadcat from "./assets_p2/sadcat.PNG"
function App() {
  //so current page is the current page, set current page is a function, use state(the default!)
  //all in all make a box called home. index 0 at home is cur page and a button to change it is setcurpage
  const [currentPage, setCurrentPage] = useState("home >-<")
  return (
    <>
      {currentPage == "home >-<" &&
        <div className="center" >
          <div style={{ height: '100vh'}}>
            <h1 style={{ paddingTop: '30vh',width: '100vw'}} className = "maintext"> Fortune Cat </h1>
            <p style={{ fontFamily: 'monospace' }}> A study game with a gambling cat! </p>
          </div>
        {/*{} makes you to to javascript! 
        () make a function
        arrow function makes it run later*/}
      <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p> welcome to <span style = {{fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic'}}> Fortune Cat </span> </p>
        <p> i'm <span style = {{fontFamily: 'mono', fontWeight: 'bold', color: '#ffffff'}}> Patch </span> and i love to gamble </p>
        <p> mreow~ /ᐠ - ˕ -マ </p>
        <img className = "patchotherway" src = {wavecat}/>
      </motion.div>
      <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p> except...im kinda broke now sob</p>
        <p> so i entered "who wants to be a meow-lionaire!" </p>
        <img className = "patch" src = {sadcat}/>
      </motion.div>
      <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p> that's when you come in  </p>
        <p> help me get the questions right in the flashcards tab </p>
        <p> so i can win this gameshow!</p>
        <img className = "patchotherway" src = {sparklecat}/>
      </motion.div>
      <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p> every time we get 10 coins we can gamble~ ฅ^-⩊-^ ฅ  </p>
        <p> there we can spend our money on cute gacha </p>
        <p> there are over 3 million possibilities and 5 rarities!</p>
        <img className = "patch" src = {hugcat}/>
      </motion.div>
     <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p> Annddd that's really it! </p>
        <p> let's gamble! </p>
        <p>  ദ്ദി ˉ͈̀꒳ˉ͈́ {")"}✧</p>
        <img className = "patchotherway" src = {wavecat}/>
      </motion.div>
      <motion.div 
      className = "patcher"
      initial = {{opacity: 0, y: (200)}}
      viewport = {{once: false}}
      whileInView = {{opacity: 1, y: (0) }}
      transition = {{duration: 0.7, ease: "easeInOut"}}>
        <p style={{ fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '70px'}}> Ready? Let's make an account!</p>
        <div className = "bottom buttonSpacer">
          <button className="buttons" type="button" onClick={() => setCurrentPage("login")}>  Login  </button>
          <button className="buttons" type="button" onClick={() => setCurrentPage("signup")}> Sign Up </button>
        </div>
      </motion.div>
    </div >
      }
{/* in react u cant use if statements, the one on the right will run if true*/ }
{ currentPage == "login" && <Login /> }
{ currentPage == "signup" && <Signup /> }
    </>
  )
}

export default App
