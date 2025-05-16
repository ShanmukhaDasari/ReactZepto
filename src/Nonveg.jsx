import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './Nonveg.css'; // 👈 CSS for styling
import { toast, ToastContainer } from 'react-toastify';

function Nonveg() {
  const nonvegProducts = useSelector(globalState => globalState.products.nonveg) || [];
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Price range state
  const [maxRange, setMaxRange] = useState(1000); // Adjust max value as needed
  const [price, setPrice] = useState(maxRange);

  // Filtered products based on slider value
  const filteredItems = nonvegProducts.filter(item => item.Price <= price);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [price]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderNonvegItems = () => {
    return paginatedItems.map((item, index) => (
      <li key={index}>
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>Price: ₹{item.Price}</p>
        <button onClick={() => {dispatch(AddToCart(item));toast.success(
                      <div className="custom-toast">
                        <img src={item.image} alt="product" className="toast-img" />
                        <div className="toast-text">{item.name} added to cart!</div>
                      </div>
                    );}}>Add to Cart</button>
      </li>
    ));
  };

  return (
    <div className="nonveg-container">
      <h2 className="nonveg-title">🍗 Non Veg Items</h2>
      {/* <ToastContainer position='top-center' autoClose={1000}/> */}

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

      <ul className="nonveg-list">{renderNonvegItems()}</ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

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

export default Nonveg;
