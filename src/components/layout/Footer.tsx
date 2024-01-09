// Footer layout 
import { LogoIcon } from "../SVGComponents";
import textData from "../../data/textData.json";

const Footer = () => {
  
  const year: number = new Date().getFullYear()

  const content = (
    <footer className="footer">
      <div className="footer__branding">
        <LogoIcon height='40px' width='40px' wrapperCustomStyle={ { 'height': '100%' } }/>
        <p> { textData["developed-by"] } { year }</p>
      </div>
      <div className="footer_page-info">
        <p> { textData["brand-and-site-name"] }</p>
      </div>
    </footer>
  )
  return content
}

export default Footer;