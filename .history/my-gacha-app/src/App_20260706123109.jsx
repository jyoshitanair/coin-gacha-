import { useState } from 'react'
import './App.css'

import Login from './login.jsx'
import Signup from './signup.jsx'
function App() {
  //so current page is the current page, set current page is a function, use state(the default!)
  //all in all make a box called home. index 0 at home is cur page and a button to change it is setcurpage
  const [currentPage,setCurrentPage] = useState("home >-<")
  return (
    <>
    {currentPage == "home >-<" &&
      <div className = "center" >
        <h1 className = "maintext"> Pocket Beasts </h1>
        {/*{} makes you to to javascript! 
        () make a function
        arrow function makes it run later*/}
        <div style = {{width: }}> 

        </div>
        <p style = {{fontFamily: 'monospace'}}> Spend your coins to collect as many cute monsters as you can! </p>
        <p style = {{ fontWeight: 'bold', fontFamily: 'monospace'}}> What are you waiting for? Let's go!</p>
        <div id = "buttonSpacer">
          <button className = "buttons" type = "button" onClick = {() => setCurrentPage("login")}>  Login  </button>
          <button className = "buttons" type = "button" onClick = {() => setCurrentPage("signup")}> Sign Up </button>
        </div>
      </div>
      }
      {/* in react u cant use if statements, the one on the right will run if true*/}
        {currentPage == "login" && <Login />}
        {currentPage == "signup" && <Signup />}
    </>
  )
}

export default App
