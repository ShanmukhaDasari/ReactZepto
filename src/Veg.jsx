import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './Store';
import './Veg.css';
import { toast } from 'react-toastify';

function Veg() {
  const vegProducts = useSelector(state => state.products.veg) || [];
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });

  // Filter products based on price
  const filteredProducts = vegProducts.filter(
    (product) =>
      product.Price >= priceFilter.min &&
      product.Price <= (priceFilter.max === '' ? Infinity : priceFilter.max)
  );

  // Pagination logic after filtering
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [priceFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderVegItems = () => {
    return paginatedItems.map((product, index) => (
      <li key={index}>
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>₹{product.Price}</p>
        <button onClick={() => {dispatch(AddToCart(product));toast.success(
              <div className="custom-toast">
                <img src={product.image} alt="product" className="toast-img" />
                <div className="toast-text">{product.name} added to cart!</div>
              </div>
            );}}>Add to Cart</button>
      </li>
    ));
  };

  return (
    <div className="veg-container">
      <h3 className="veg-title">🥦 Veg Items</h3>
      {/* <ToastContainer position='top-center' autoClose={1000}/> */}

      {/* Price Filter */}
      <div className="price-filter">
        <label>
          Min Price:
          <input
            type="number"
            value={priceFilter.min}
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, min: Number(e.target.value) || 0 })
            }
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={priceFilter.max === Infinity ? '' : priceFilter.max}
            onChange={(e) =>
              setPriceFilter({
                ...priceFilter,
                max: e.target.value ? Number(e.target.value) : Infinity,
              })
            }
          />
        </label>
        <button
    onClick={() => setPriceFilter({ min: 0, max: Infinity })} >
    Clear Filters
  </button>
      </div>
       

      <ul className="veg-list">{renderVegItems()}</ul>

      {/* Pagination Controls */}
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

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Veg;
