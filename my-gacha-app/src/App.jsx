import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './login.jsx'
function App() {
  //so current page is the current page, set current page is a function, use state(the default!)
  //all in all make a box called home. index 0 at home is cur page and a button to change it is setcurpage
  const [currentPage,setCurrentPage] = useState("home >-<")
  return (
    <>
    {currentPage == "home >-<" &&
    <>
      <p> Gacha Coins </p>
      {console.log("hi")}
      {/*{} makes you to to javascript! 
      () make a function
      arrow function makes it run later*/}
      <button type = "button" onClick = {() => setCurrentPage("login")}> Login </button>
      </>
      }
      {/* in react u cant use if statements, the one on the right will run if true*/}
        {currentPage == "login" && <Login />}
    </>
  )
}

export default App
