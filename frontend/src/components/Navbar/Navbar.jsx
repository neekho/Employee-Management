import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>Gallium MERN</div>
      <div className='links space-x-4'>
        <a href="#">Home</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>
    </nav>
  )
}

export default Navbar