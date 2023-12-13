// Reusable divider line 
import './DividerLine.css';

// TYPE
type DividerLineType = { style?: string }
const DividerLine = ({ style = '' }: DividerLineType) => {
  return (
    <div className={ `product-sidemenu-divider ${ style } ` }></div>
  )
}

export default DividerLine;