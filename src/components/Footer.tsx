import logo from '../assets/logo.svg'

const Footer = () => {
  
  const year: number = new Date().getFullYear()

  const content = (
    <footer className="footer">
      <img className='logo' src={logo}/>
      <p>Palkó Ákos, {year}</p>
      <p> Shopping Cart ❤️</p>
    </footer>
  )
  return content
}

export default Footer