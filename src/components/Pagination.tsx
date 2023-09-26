import './Pagination.css'

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="pagination__navigation">
        <button className='button--pagination-navigation'> {'previous'} </button>
        <button className='button--pagination-navigation'> {'1'} </button>
        <button className='button--pagination-navigation'> {'2'} </button>
        <button className='button--pagination-navigation'> {'3'} </button>
        <button className='button--pagination-navigation'> {'next'} </button>
      </div>
      {/* <div className="pagination__page-selection">  </div> */}
    </div>
  )
}

export default Pagination