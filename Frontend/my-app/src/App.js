import React from 'react'
import Login from './Login' 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Tasks from './Tasks'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login/>}></Route>
      <Route path = "/signup" element = {<Signup/>}></Route>
      <Route path = "/tasks" element = {<Tasks/>}></Route>
      <Route path = "/Home" element = {<Home />}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
