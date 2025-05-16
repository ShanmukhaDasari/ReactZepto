import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './Cafe.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cafe() {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const cafeProducts = useSelector((globalState) => globalState.products.cafe);
  const dispatch = useDispatch();

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Below ₹100', min: 0, max: 99 },
    { label: '₹100 - ₹199', min: 100, max: 199 },
    { label: '₹200 - ₹499', min: 200, max: 499 },
    { label: '₹500 and above', min: 500, max: Infinity },
  ];

  const handleCheckboxChange = (range) => {
    const exists = selectedRanges.find((r) => r.label === range.label);
    if (exists) {
      setSelectedRanges(selectedRanges.filter((r) => r.label !== range.label));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  const filteredCafeItems = cafeProducts.filter((item) => {
    if (selectedRanges.length === 0 || selectedRanges.some((range) => range.label === 'All Prices')) return true;
    return selectedRanges.some(
      (range) => item.Price >= range.min && item.Price <= range.max
    );
  });

  const totalPages = Math.ceil(filteredCafeItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredCafeItems.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const renderCafeItems = () => {
    return paginatedItems.map((item, index) => (
      <li key={index}>
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{`₹${item.Price}`}</p>
        <button
  onClick={() => {
    dispatch(AddToCart(item));
    toast.success(
      <div className="custom-toast">
        <img src={item.image} alt="product" className="toast-img" />
        <div className="toast-text">{item.name} added to cart!</div>
      </div>
    );
  }}
>
  Add to Cart
</button>

      </li>
    ));
  };

  const handleClearFilters = () => {
    setSelectedRanges([]);
    setIsFilterOpen(false);
  };

  return (
    <div className="cafe-container">
      <h2 className="cafe-title">🍩 Cafe Items</h2>

      {/* Toast container */}
      {/* <ToastContainer position='top-center' autoClose={1000}/> */}
      {/* <ToastContainer
  position="top-center"
  autoClose={1500}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
/> */}

      <div className="content">
        {/* Filter Section */}
        <div className="filter-section">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="filter-title">
            Filter by Price
            <span className={isFilterOpen ? 'triangle-up' : 'triangle-down'}></span>
          </button>

          {isFilterOpen && (
            <div className="checkbox-dropdown">
              {priceRanges.map((range) => (
                <label key={range.label}>
                  <input
                    type="checkbox"
                    checked={selectedRanges.some((r) => r.label === range.label)}
                    onChange={() => handleCheckboxChange(range)}
                  />
                  {range.label}
                </label>
              ))}
              <button onClick={handleClearFilters}>Clear All Filters</button>
            </div>
          )}
        </div>

        {/* Items Section */}
        <div className="items-section">
          <ul className="cafe-list">{renderCafeItems()}</ul>

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
      </div>
    </div>
  );
}

export default Cafe;
