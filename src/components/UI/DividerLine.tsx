// Reusable divider line 
import './DividerLine.css';

// TYPE
type DividerLinePropsType = {
  style?: string
}

const DividerLine = ({ style }: DividerLinePropsType) => {
  return (
    <div className={`divider-line ${ style }`}> &nbsp; </div>
  )
}

export default DividerLine;