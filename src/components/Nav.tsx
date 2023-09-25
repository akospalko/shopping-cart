import React from 'react'
import { NavLink } from 'react-router-dom'

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({viewCart, setViewCart}: PropsType) => {
  const button = viewCart ? 
  <button className='button--toggle-cart' onClick={() => setViewCart(false)}> Products </button>
  :
  <button className='button--toggle-cart' onClick={() => setViewCart(true)}> Cart </button>

  const content = (
    <NavLink to={`/${ viewCart ? 'products' : 'cart'}`} className="nav">
      {button}
    </NavLink>
  )

  return content
}

export default Nav