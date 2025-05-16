import React from 'react';
import './ContactUs.css'; // Import the styles

function ContactUs() {
  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* Left Column: Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p className="info-description">
            We're here to help. Reach out for questions, support, or just to say hello.
          </p>

          <div className="info-item">
            <span>📌</span>
            <p>Godavari Puskar Ghat, Rajahmundry, Andhra Pradesh, India</p>
          </div>
          <div className="info-item">
            <span>📞</span>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-item">
            <span>📧</span>
            <p>support@nextgen.com</p>
          </div>
          <div className="info-item">
            <span>🕒</span>
            <p>Mon - Fri: 10AM - 6PM</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form>
            <div className="form-row">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <textarea rows="5" placeholder="Type your message..." required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactUs;
