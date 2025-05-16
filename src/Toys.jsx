import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './Toys.css'; // 👈 Import CSS
import { toast, ToastContainer } from 'react-toastify';

function Toys() {
  const toysProducts = useSelector((state) => state.products.toys);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [selectedPriceRange, setSelectedPriceRange] = useState('All'); // State for the selected price range

  const itemsPerPage = 4; // Number of items per page

  // Price ranges for dropdown
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: Infinity },
  ];

  // Filter toys based on selected price range
  const filterByPrice = (range) => {
    return toysProducts.filter(
      (toy) => toy.Price >= range.min && toy.Price <= range.max
    );
  };

  const filteredToys = filterByPrice(
    priceRanges.find((range) => range.label === selectedPriceRange) || priceRanges[0]
  );

  // Handle pagination
  const totalPages = Math.ceil(filteredToys.length / itemsPerPage); // Only calculate total pages for filtered products
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredToys.slice(startIdx, startIdx + itemsPerPage);

  // Handle page change (Previous/Next)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle price range change
  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1); // Reset to the first page when price filter changes
  };

  // Render the filtered toy items
  const renderToyItems = () => {
    if (filteredToys.length === 0) {
      return <p>No products found for the selected price range.</p>;
    }

    return paginatedItems.map((item, index) => (
      <li key={index}>
        <img src={item.image} alt={item.name} />
        <div className="toy-info">
          <h3>{item.name}</h3>
          <p>{`Price: ₹${item.Price}`}</p>
          <button onClick={() => {dispatch(AddToCart(item));toast.success(
                        <div className="custom-toast">
                          <img src={item.image} alt="product" className="toast-img" />
                          <div className="toast-text">{item.name} added to cart!</div>
                        </div>
                      );}}>
            Add to Cart
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="toys-container">
      <h2 className="toys-title">🧸 Toys</h2>
      {/* <ToastContainer position='top-center' autoClose={1000}/> */}

      {/* Price Filter Dropdown */}
      <div className="price-filter">
        <label htmlFor="priceRange">Filter by Price: </label>
        <select
          id="priceRange"
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
        <button className="reset-btn" onClick={() => setSelectedPriceRange('All')}>
          Clear Filter
        </button>
      </div>

      <ul className="toys-list">{renderToyItems()}</ul>

      {/* Show Pagination only if there are products */}
      {filteredToys.length > 0 && totalPages > 1 && (
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

export default Toys;
