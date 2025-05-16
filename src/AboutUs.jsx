import React from 'react';
import './About.css'; // Importing styles

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-heading">About Us</h1>
        <p className="about-intro">
          Welcome to <span className="highlight">SwiftDrop</span> — your go-to ultra-fast delivery partner!
        </p>
        <p className="about-description">
          Inspired by apps like <span className="highlight">Zepto</span>, we’re on a mission to deliver groceries,
          essentials, and daily needs at lightning speed — often under <span className="highlight">10 minutes</span>.
          With a network of micro-warehouses, real-time tracking, and a seamless ordering experience, we bring
          convenience right to your doorstep.
        </p>
        <p className="about-description">
          Our team is driven by speed, reliability, and innovation. Whether it's late-night cravings or last-minute
          grocery runs, SwiftDrop has your back.
        </p>
        <div className="why-choose-us">
          <h2 className="why-heading">Why Choose Us?</h2>
          <ul className="features-list">
            <li>⚡ 10-minute deliveries</li>
            <li>📍 Hyperlocal inventory</li>
            <li>🚀 Real-time tracking</li>
            <li>💳 Secure payments</li>
            <li>📦 Contactless delivery</li>
          </ul>
        </div>
        <p className="closing-note">Thank you for choosing SwiftDrop — Speed at your service.</p>
      </div>
    </section>
  );
}

export default About;
