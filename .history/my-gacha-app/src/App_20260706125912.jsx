import { useState } from 'react'
import './App.css'

import Login from './login.jsx'
import Signup from './signup.jsx'
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
      <div style={{flexDirection: 'column', display: 'flex', gap: '80px', marginTop: '40px', width: '100vw', height: '100vh' }}>
        <p> Welcome to <span style = {{fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic'}}> Pocket Beasts </span> </p>
        <p> I'm <span style = {{fontFamily: 'mono', fontWeight: 'bold', color: '#b13d0b'}}> Patch </span> and I'm here to guide you through how this website works </p>
        <p> meow~ /ᐠ - ˕ -マ </p>
      </div>
      <div style={{ marginTop: '40px', width: '100vw', height: '100vh', flexDirection: 'column', display: 'flex', gap: '80px' }}>
        <p> First, you're going to need to get some coins!  </p>
        <p> You can get some for every question that you get right on flashcards! </p>
        <p></p>
      </div>
      <div style={{ marginTop: '40px', width: '100vw', height: '100vh', flexDirection: 'column', display: 'flex', gap: '80px' }}>
        <p> Once you've aquired 10 coins head over to the gambling tab~ ฅ^-⩊-^ ฅ  </p>
        <p> There you can spend your hard earned money for unique critters </p>
        <p>There are over 3 million possibilities and 5 rarities!</p>
      </div>
      <div style={{ marginTop: '40px', width: '100vw', height: '100vh', flexDirection: 'column', display: 'flex', gap: '80px' }}>
        <p> Annddd that's really it! </p>
        <p> Patch out ദ്ദി >꒳ˉ͈́ {")"}✧ </p>
        <p>There are over 3 million possibilities and 5 rarities!</p>
      </div>
      <p style={{ fontWeight: 'bold', fontFamily: 'monospace' }}> What are you waiting for? Let's go!</p>
      <div id="buttonSpacer">
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
