import React from 'react'
import Nav from './Nav'
import useCart from '../hooks/useCart'
import { CartIcon } from './SVGComponents'
import './Header.css'
import SearchBar from './SearchBar'

// TYPE
type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

// COMPONENT
const Header = ({viewCart, setViewCart}: PropsType) => {
  // CONTEXT
  const {totalItems} = useCart();

  // ELEMENTS
  const title = (
    <div className="header__title">
      <h1> Acme co. </h1>
    </div>
  )

  const navigation = (
    <div className="header__nav">
      <Nav viewCart={viewCart} setViewCart={setViewCart}/>
    </div>
  )

  const cart = (
    <div className="cart-icon">
      <CartIcon width='30px' height='30px' fill='var(--color-4)' wrapperCustomStyle={{'height': 'auto', 'width': 'auto','alignItems': 'center'}}/> 
      {totalItems > 0 ? <span className="cart-icon__counter"> {totalItems > 100 ? '100+' : totalItems} </span> : null}
    </div>
  )

  const searchBar = (
    <div className="header__search-bar">
      <SearchBar/>
    </div>
  )

  // LAYOUTS
  const smallScreenLayout = (
    <header className='header header__small-screen'>
      {navigation}
      {title}
      {cart}
      {searchBar}
    </header>
  )

  const largeScreenLayout = (
    <header className='header header__large-screen'>
      {title}
      {searchBar}
      {navigation}
      {cart}
    </header>
  )

  return (
    <>
      {smallScreenLayout}
      {largeScreenLayout}
    </>
  )
}

export default Header