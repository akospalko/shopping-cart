// Page to display status messages related to various page events (e.g. displaying search results, error )
import { useNavigate } from 'react-router-dom';
import textData from '../data/textData.json';
import './ErrorPage.css';

// TYPE
type textContentType = {
  title: string,
  subtitle: string
}

type ErrorPagePropsType = {
  content: textContentType
};


// COMPONENT
const ErrorPage = ({ content }: ErrorPagePropsType) => {

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

  return ( 
    <main className='main main--status-page'>
      <div className='main--status-page-wrapper'>
        <h1> { content.title } </h1>
        <h2> { content.subtitle } </h2>
        <div className='status-page__button'>
          <button className='button--navigate-back' onClick={ navigateToLastVisited }> { textData['button-navigate-to'] } { lastVisitedPage } </button>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage;