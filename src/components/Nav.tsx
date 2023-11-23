import React from 'react'
import { NavLink } from 'react-router-dom'

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({viewCart, setViewCart}: PropsType) => {
  const button = viewCart ? 
  <div className='button--toggle-cart' onClick={() => setViewCart(false)}> Products </div>
  :
  <div className='button--toggle-cart' onClick={() => setViewCart(true)}> Cart </div>

  const content = (
    <NavLink to={`/${ viewCart ? 'all/1' : 'cart'}`} className="nav">
      {button}
    </NavLink>
  )

  return content
}

export default Nav