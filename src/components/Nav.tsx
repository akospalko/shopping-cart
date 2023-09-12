import React from 'react'

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
    <nav className="nav">
      {button}
    </nav>
  )

  return content
}

export default Nav