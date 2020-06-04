import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'todomvc-app-css/index.css'

import Footer from './vues/Footer'
import TodoListComponent from './vues/TodoList'

function App () {
  return (
    <div className='app'>
      <div className='todoapp'>
        <BrowserRouter>
          <Route path='/:filter?' component={TodoListComponent} />
        </BrowserRouter>
      </div>

      <Footer />
    </div>
  )
}

export default App
