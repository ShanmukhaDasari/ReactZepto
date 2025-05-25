import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddOrder, ClearCart, DecCart, IncCart, RemoveFromCart } from './Store';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import confetti from 'canvas-confetti';
import emailjs from 'emailjs-com';
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
  const cartObjects = useSelector(state => state.cart);
  const currentUser = useSelector((state) => state.users.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponCodeRef = useRef();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [couponName, setCouponName] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showBlast, setShowBlast] = useState(false);

  const handleCouponPer = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(couponCode);

    switch (couponCode) {
      case 'SIVA10':
        setCouponCodeDiscountPer(10);
        break;
      case 'SIVA20':
        setCouponCodeDiscountPer(20);
        break;
      case 'SIVA30':
        setCouponCodeDiscountPer(30);
        break;
      default:
        alert('Invalid Coupon Code');
        setCouponCodeDiscountPer(0);
    }
  };

  const calculatingAmount = () => {
    const totalPrice = cartObjects.reduce((sum, item) => sum + item.Price * item.quantity, 0);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const priceAfterDiscount = totalPrice - discountAmount;
    const couponDiscount = (priceAfterDiscount * couponCodeDiscountPer) / 100;
    const subTotal = priceAfterDiscount - couponDiscount;
    const taxPrice = (subTotal * 5) / 100;
    const shippment = 50;
    const finalAmount = subTotal + taxPrice + shippment;

    return { totalPrice, discountAmount, taxPrice, finalAmount, couponDiscount, shippment };
  };

  const { totalPrice, discountAmount, taxPrice, finalAmount, couponDiscount, shippment } = calculatingAmount();

  const generateNextOrderId = () => {
    let lastNumber = parseInt(sessionStorage.getItem('lastOrderNumber')) || 0;
    let nextNumber = lastNumber + 1;
    if (nextNumber >= 10000) nextNumber = 1;
    sessionStorage.setItem('lastOrderNumber', nextNumber.toString());
    return 'OOO' + String(nextNumber).padStart(3, '0');
  };

  const confirmPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (!paymentConfirmed) {
      alert('Please confirm payment before proceeding.');
      return;
    }
    if (cartObjects.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderId = generateNextOrderId();

    const templateParams = {
      order_id: orderId,
      orders: cartObjects.map(item => ({
        item: `<img src="${item.image}" />`,
        name: item.name,
        price: (item.Price * item.quantity).toFixed(2),
        units: item.quantity
      })),
      cost: {
        totalPrice: totalPrice,
        discount: discountAmount,
        couponDiscount: couponDiscount,
        shipping: shippment,
        tax: taxPrice.toFixed(2),
        total: finalAmount.toFixed(2)
      },
      email: currentUser.email
    };

    emailjs.send('service_v0f552x', 'template_fy78uzm', templateParams, 'nnkX_qT8FqthPe4pN')
      .then(() => console.log('Email sent successfully'))
      .catch(error => console.error('Email sending failed:', error));

    setShowBlast(true);
    setTimeout(() => setShowBlast(false), 2000);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });

    const purchaseDetails = {
      orderId,
      date: new Date().toLocaleString(),
      items: [...cartObjects],
      finalPrice: finalAmount.toFixed(2),
      paymentMethod
    };

    dispatch(AddOrder(purchaseDetails));
    toast.success('✅ Order placed successfully!');

    setTimeout(() => {
      dispatch(ClearCart());
      setRedirectMessage('🔄 Redirecting to Orders...');
      setTimeout(() => navigate('/orders'), 2000);
    }, 1000);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentConfirmed(false);
  };

  const renderCartItems = () => {
    return cartObjects.map((item, index) => (
      <div className="cart-item" key={index}>
        <div className="cart-image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="cart-details">
          <h4>{item.name}</h4>
          <p>₹{item.Price}</p>
          <div className="cart-actions">
            <button onClick={() => { dispatch(DecCart(item)); toast.info(`${item.name} quantity decreased`); }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => { dispatch(IncCart(item)); toast.info(`${item.name} quantity increased`); }}>+</button>
            <button className="delete-btn" onClick={() => { dispatch(RemoveFromCart(item)); toast.info(`${item.name} removed from cart`); }}>Delete</button>
          </div>
        </div>
        <div className="cart-subtotal">
          <strong>₹{(item.Price * item.quantity).toFixed(2)}</strong>
        </div>
      </div>
    ));
  };

  return (
    <div className="cart-container">
      {/* <ToastContainer position='top-center' autoClose={1000} /> */}
      {showBlast && <div className="bomb-blast">💥</div>}

      {redirectMessage && (
        <div className="redirect-message">
          <p>{redirectMessage}</p>
        </div>
      )}

      <h2 className="cart-heading">🛒 Your Shopping Cart</h2>

      {cartObjects.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {renderCartItems()}

          <div className="cart-summary">
            <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>

            <div className="discount-buttons">
              <button onClick={() => setDiscountPercentage(10)}>Apply 10% Discount</button>
              <button onClick={() => setDiscountPercentage(20)}>Apply 20% Discount</button>
              <button onClick={() => setDiscountPercentage(30)}>Apply 30% Discount</button>
            </div>

            <div className="coupon-section">
              <input type="text" ref={couponCodeRef} placeholder="Enter coupon code" />
              <button onClick={handleCouponPer}>Apply Coupon</button>
            </div>

            {couponCodeDiscountPer > 0 && (
              <h4>Applied Coupon <span className="highlight">{couponName}</span>: ₹{couponDiscount.toFixed(2)}</h4>
            )}

            <h4>Discount: ₹{discountAmount.toFixed(2)}</h4>
            <h4>Tax (5%): ₹{taxPrice.toFixed(2)}</h4>
            <h4>Shippment: ₹{shippment.toFixed(2)}</h4>
            <h2 className="final-amount">Final Amount: ₹{finalAmount.toFixed(2)}</h2>

            <div className="payment-methods">
              <h3>Choose Payment Method</h3>
              <button onClick={() => handlePaymentMethodChange('UPI')}>UPI Payment</button>
              <button onClick={() => handlePaymentMethodChange('Card')}>Credit/Debit Card</button>
              <button onClick={() => handlePaymentMethodChange('Wallet')}>Wallet</button>
            </div>

            {paymentMethod === 'UPI' && (
              <div className="qr-popup">
                <h3>Scan to Pay via UPI</h3>
                <QRCode
                  value={`upi://pay?pa=9347424265@ybl&pn=Lohith%20Cart%20Craze&am=${finalAmount.toFixed(2)}&cu=INR`}
                />
                <p>Scan this QR with any UPI app</p>
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  /> I have completed the payment
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Complete Order
                </button>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="card-payment">
                <h3>Enter Card Details</h3>
                <input type="text" placeholder="Card Number" maxLength="16" />
                <input type="text" placeholder="Cardholder Name" />
                <input type="text" placeholder="MM/YY" maxLength="5" />
                <input type="text" placeholder="CVV" maxLength="3" />
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  /> I confirm payment was successful
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Pay ₹{finalAmount.toFixed(2)}
                </button>
              </div>
            )}

            {paymentMethod === 'Wallet' && (
              <div className="wallet-payment">
                <h3>Wallet Payment</h3>
                <select>
                  <option>-- Select Wallet --</option>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                </select>
                <input type="text" placeholder="Mobile Number" maxLength="10" />
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  /> I confirm payment was successful
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Pay ₹{finalAmount.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
