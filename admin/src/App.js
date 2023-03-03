import React from 'react'
import { 
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Menu from './components/Menu'
import Home from './pages/Home'
import Departamentos from './pages/Departamentos'
import FormDepartamentos from './pages/FormDepartamentos'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Menu/>

        <div className="container mt-3">
          <Routes>
            <Route path='/'>
              <Route index element={<Home/>}/>
              <Route path='departamentos'>
                <Route index element={<Departamentos/>}/>
                <Route path='new' element={<FormDepartamentos/>}/>
                <Route path=':idDepartamento' element={<FormDepartamentos/>}/>
              </Route>
            </Route>
          </Routes>      
        </div>

      </BrowserRouter>
    </>
  )
}

export default App
