import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link 
            className="navbar-brand text-bg-primary"
            to="/"
          >
            ADMIN
          </Link>
          
          <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-bg-primary"
                  href="#"
                  role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Departamentos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/departamentos/new"
                    >
                      Cadastrar
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="dropdown-item"
                      to="/departamentos"
                    >
                      Listar
                    </Link>
                  </li>
                </ul>
              </li>
             
            </ul>
            <form className="d-flex" role="search">
              <input 
                className="form-control me-2" 
                type="search"
                placeholder="Search"
              />
              <button 
                className="btn btn-warning"
                type="submit"
              >
                <i className="bi bi-search"/>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menu