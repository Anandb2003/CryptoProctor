import React from 'react';
import HomeNavbar from './HomeNavbar';

function Contactinfo() {
  return (
    <div>
      <HomeNavbar />
      <div style={containerStyles}>
        <h1><strong>CONTACT US</strong></h1>
        <p>We are here to help you with any questions or support you need regarding our online exam portal. Please use the following contact details to reach out to us:</p>
        
        <div style={infoStyles}>
          <h2>Support Email:</h2>
          <p><a href="mailto:support@blockexams.com" style={linkStyles}>support@blockexams.com</a></p>
          
          <h2>Customer Service:</h2>
          <p>Phone: <a href="tel:+1234567890" style={linkStyles}>+1 (234) 567-890</a></p>
          
          <h2>Office Address:</h2>
          <p>Block Exams Inc.<br/>
             123 Blockchain Blvd,<br/>
             Tech City, TC 45678,<br/>
             Country</p>
          
          <h2>Follow Us:</h2>
          <div style={socialMediaStyles}>
            <a href="https://facebook.com/blockexams" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={iconStyles} />
            </a>
            <a href="https://twitter.com/blockexams" target="_blank" rel="noopener noreferrer">
              <img src="https://www.shutterstock.com/image-vector/indonesia-9-january-2024-twitter-260nw-2410058195.jpg" alt="Twitter" style={iconStyles1} />
            </a>
            <a href="https://linkedin.com/company/blockexams" target="_blank" rel="noopener noreferrer">
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Symbol.png" alt="LinkedIn" style={iconStyles} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyles = {
  padding: '40px',
  maxWidth: '800px',
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  backgroundColor: '#f4f4f9', // Light background color for contrast
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.80)', // Soft shadow for depth
};

const infoStyles = {
  marginTop: '20px',
};

const linkStyles = {
  color: '#1a73e8', // Example link color
  textDecoration: 'none',
};

const socialMediaStyles = {
  display: 'flex',
  gap: '15px', // Space between icons
  marginTop: '10px',
};

const iconStyles = {
  width: '50px', // Adjust size as needed
  height: '30px',
};

const iconStyles1 = {
    width: '30px', // Adjust size as needed
    height: '30px',
  };

export default Contactinfo;
