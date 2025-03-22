import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = 'service_qwyckzi';
    const templateID = 'template_4d0m0c6'; // Notification template
    const autoReplyTemplateID = 'template_7rl59tg'; // Auto-reply template
    const publicKey = 'E7PBW2JJQEYniKIBZ';

    // Validate email field
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Parameters for the notification email (to you)
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'eecohmplustwo@gmail.com',
      message: formData.message,
    };

    // Parameters for the auto-reply email (to the submitter)
    const autoReplyParams = {
      to_name: formData.name,
      to_email: formData.email,
      reply_subject: 'Thank you for contacting us',
    };

    // Log params for debugging
    console.log('Notification Params:', templateParams);
    console.log('Auto-Reply Params:', autoReplyParams);

    // Send the notification email first
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Notification email sent successfully!', response.status, response.text);
        // Then send the auto-reply
        return emailjs.send(serviceID, autoReplyTemplateID, autoReplyParams, publicKey);
      })
      .then((response) => {
        console.log('Auto-reply email sent successfully!', response.status, response.text);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setError(`Failed to send your message: ${err.text || 'Unknown error'}`);
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <div className="contact-form-container">
      {submitted ? (
        <p className="form-success">Thank you! We've sent you a confirmation email and we'll get back to you soon.</p>
      ) : error ? (
        <p className="form-error">{error}</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;