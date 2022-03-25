import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return <>
        <nav class="navbar navbar-expand p-0 border">
            <ul className="navbar-nav">
                <li className='nav-item'>
                    <NavLink to="/" exact activeClassName='current' className='nav-link mb-0 px-5 text-secondary'>Form</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="/table" exact activeClassName='current' className='nav-link mb-0 px-5 text-secondary'>Table</NavLink>
                </li>
            </ul>
        </nav>
    </>
}

export default Header