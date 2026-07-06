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
            <h1 style={{ paddingTop: '30vh',width: '100vw'}} className = "maintext"> Pocket Beasts </h1>
            <p style={{ fontFamily: 'monospace' }}> Spend your coins to collect as many cute monsters as you can! </p>
          </div>
        {/*{} makes you to to javascript! 
        () make a function
        arrow function makes it run later*/}
      <div className = "patcher">
        <p> Welcome to <span style = {{fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic'}}> Pocket Beasts </span> </p>
        <p> I'm <span style = {{fontFamily: 'mono', fontWeight: 'bold', color: '#ffffff'}}> Patch </span> and I'm here to guide you through how this website works </p>
        <p> meow~ /ᐠ - ˕ -マ </p>
        <img className = "patchotherway" src = {wavecat}/>
      </div>
      <div className = "patcher">
        <p> You see...I've got a crippling gambling addiction. </p>
        <p> and i've run out of money.</p>
        <p> and i've run out of money.</p>
        <img className = "patch" src = {sadcat}/>
      </div>
      <div className = "patcher">
        <p> Once you've aquired 10 coins head over to the gambling tab~ ฅ^-⩊-^ ฅ  </p>
        <p> There you can spend your hard earned money for unique critters </p>
        <p>There are over 3 million possibilities and 5 rarities!</p>
        <img className = "patchotherway" src = {wavecat}/>
      </div>
      <div className = "patcher">
        <p> Annddd that's really it! </p>
        <p> have fun! ദ്ദി ˉ͈̀꒳ˉ͈́ {")"}✧ </p>
        <img className = "patch" src = {wavecat}/>
      </div>
      <p style={{ fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '70px'}}> Ready? Let's make an account!</p>
      <div className = "bottom" id="buttonSpacer">
        <button className="buttons" type="button" onClick={() => setCurrentPage("login")}>  Login  </button>
        <button className="buttons" type="button" onClick={() => setCurrentPage("signup")}> Sign Up </button>
      </div>
    </div >
      }
{/* in react u cant use if statements, the one on the right will run if true*/ }
{ currentPage == "login" && <Login /> }
{ currentPage == "signup" && <Signup /> }
    </>
  )
}

export default App
