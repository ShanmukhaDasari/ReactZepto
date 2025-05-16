import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './Mobiles.css'; // Importing styles
import { toast, ToastContainer } from 'react-toastify';

function Mobiles() {
  const mobileProducts = useSelector(globalState => globalState.products.mobiles);
  const dispatch = useDispatch();

   const itemsPerPage = 4; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  
    // Pagination logic: Calculate which items to display
    const totalPages = Math.ceil(mobileProducts.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedItems = mobileProducts.slice(startIdx, startIdx + itemsPerPage);
  
    // Handle page change (Previous/Next)
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  

  const renderMobileItems = () => {
    return paginatedItems.map((item, index) => (
      <li key={index} className="product-item">
        <img src={item.image} alt={item.name} className="product-image" />
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{`Price: ₹${item.Price}`}</p>
        <button className="add-to-cart-button" onClick={() => {dispatch(AddToCart(item));toast.success(
                      <div className="custom-toast">
                        <img src={item.image} alt="product" className="toast-img" />
                        <div className="toast-text">{item.name} added to cart!</div>
                      </div>
                    );}}>
          Add to Cart
        </button>
      </li>
    ));
  };

  return (
    <div className="mobiles-container">
      <h2 className="mobiles-heading">📱 Mobile Products</h2>
      <ul className="product-list">
        {renderMobileItems()}
      </ul>
      {/* <ToastContainer position='top-center' autoClose={1000}/> */}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          {/* Displaying page numbers dynamically */}
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Mobiles;
