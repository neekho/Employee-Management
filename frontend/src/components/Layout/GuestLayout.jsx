import React from 'react'


// Components
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const GuestLayout = ({children}) => {
  return (
    <>
        <Navbar />
            {children}
        <Footer />
    
    </>
  )
}

export default GuestLayout