import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import Root from './Root'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </>
  )

}

export default App;
