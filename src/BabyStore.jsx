import React, { useState } from 'react'; // Importing useState
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './BabyStore.css'; // Importing styles
import { toast, ToastContainer } from 'react-toastify';

function BabyStore() {
  const babyProducts = useSelector(globalState => globalState.products.baby);
  const dispatch = useDispatch();

   // Price range state
      const [maxRange, setMaxRange] = useState(100000); // Adjust max value as needed
      const [price, setPrice] = useState(maxRange);
    
      // Filtered products based on slider value
      const filteredItems = babyProducts.filter(item => item.Price <= price);
    

  const itemsPerPage = 4; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page

  // Pagination logic: Calculate which items to display
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);

  // Handle page change (Previous/Next)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderBabyProducts = () => {
    return paginatedItems.map((item, index) => (
      <li key={index} className="product-item">
        <img src={item.image} alt={item.name} className="product-image" />
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{`Price: ₹${item.Price}`}</p>
        <button className="add-to-cart-button" onClick={() => {dispatch(AddToCart(item));toast.success(
       <div className="custom-toast"><img src={item.image} alt="product" className="toast-img" />
       <div className="toast-text">{item.name} added to cart!</div>
     </div>);}}>
          Add to Cart
        </button>
      </li>
    ));
  };

  return (
    <div className="baby-store-container">
      <h2 className="baby-store-heading">🍼 Baby Products</h2>

      {/* Price Range Filter */}
      <div className="price-slider-container">
        <label htmlFor="priceRange">Filter by Price: ₹{price}</label>
        <input
          type="range"
          id="priceRange"
          min="0"
          max={maxRange}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button className="reset-btn" onClick={() => setPrice(maxRange)}>Clear Filter</button>
      </div>
      <ul className="product-list">
        {renderBabyProducts()}
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

export default BabyStore;
