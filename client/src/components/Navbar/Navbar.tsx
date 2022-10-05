import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC<{}> = () => {
  return (
    <Link to='/'>
      <h2 className='navbar-text'> stfuandclick.com </h2>
    </Link>
  );
}

export default Navbar