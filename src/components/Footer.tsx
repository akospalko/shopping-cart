import { LogoIcon } from './SVGComponents'

const Footer = () => {
  
  const year: number = new Date().getFullYear()

  const content = (
    <footer className="footer">
      <div className="footer__branding">
        <LogoIcon height='40px' width='40px' wrapperCustomStyle={{'height': '100%'}}/>
        <p>Palkó Ákos, {year}</p>
      </div>
      <div className="footer_page-info">
        <p> Acme co., Shopping Cart ❤️</p>
      </div>
    </footer>
  )
  return content
}

export default Footer