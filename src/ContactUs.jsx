import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

function ContactUs() {
  const [form, setForm] = useState({
    subject: '',
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      subject: form.subject,
      name: form.name,
      from_email: form.email,
      message: form.message
    };

    emailjs
      .send('service_v0f552x', 'template_a7clxor', templateParams, 'nnkX_qT8FqthPe4pN')
      .then(() => {
        alert('✅ Message sent successfully!');
        setForm({ subject: '', name: '', email: '', message: '' });
        setStatus('');
      })
      .catch(() => {
        setStatus('❌ Failed to send message. Please try again.');
      });
  };

  return (
    <section className="contact-wrapper">
      <div className="contact-left">
        <h2>Contact Information</h2>
        <p>We're here to help. Reach out for questions, support, or just to say hello.</p>

        <div className="info-item">
          <span>📌</span>
          <p>Godavari Puskar Ghat, Rajahmundry, AP, India</p>
        </div>
        <div className="info-item">
          <span>📞</span>
          <p>+91 98765 43210</p>
        </div>
        <div className="info-item">
          <span>📧</span>
          <p>support@shanmukhaTech.com</p>
        </div>
        <div className="info-item">
          <span>🕒</span>
          <p>Mon - Fri: 10AM - 6PM</p>
        </div>
      </div>

      <div className="contact-right">
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Type your message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
