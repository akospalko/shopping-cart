// Page to display status messages related to various page events (e.g. displaying search results, error )
import './StatusPage.css'
import  STATUS_CONTENT from '../data/statusMessages.json'
import { useNavigate } from 'react-router-dom'

// TYPE
type PropsType = {
  statusType: keyof typeof STATUS_CONTENT
}

// COMPONENT
const StatusPage = ({statusType}: PropsType) => {

  // ROUTE
  const navigate = useNavigate();
  // Retrieve the specified last visited page from session stroage
  const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');

  // HANDLER
  // navigate back to the tracked list of last visited routes (products, cart)
  const navigateToLastVisited = () => {
    switch(lastVisitedPage) {
      case 'cart':
        navigate('/cart');
        break;
      case 'product':
        navigate('/products');
        break;
      default:
        navigate('/');
    }
  };

  
  // DATA
  const statusContent = STATUS_CONTENT[statusType];

  return ( 
    <main className='main main--status-page'>
      <div className='main--status-page-wrapper'>
        <h1> {statusContent?.h1} </h1>
        <h2> {statusContent?.h2} </h2>
        <div className='status-page__button'>
          <button className='button--navigate-back' onClick={navigateToLastVisited}> Back to {lastVisitedPage} </button>
        </div>
      </div>
    </main>
  )
}

export default StatusPage