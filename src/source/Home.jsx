import React from 'react';
import HomeNavbar from './HomeNavbar';

function Home() {
  const homeStyles = {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(16,16,143,1) 100%, rgba(0,212,255,1) 100%)',
    height: '92vh', // Ensures the container takes full viewport height
    color: '#fff', // Example text color
    padding: '20px',
    position: 'relative', // Ensure that the content can be positioned relative to this container
    overflow: 'hidden', // Hide any overflowed content
  };

  const imageStyles = {
    position: 'absolute',
    left: '20%',
    top: '55%',
    transform: 'translateY(-50%)', // Vertically center the image
    width: 'auto', // Maintain image aspect ratio
    height: '40%', // Adjust height as needed
  };

  const contentStyles = {
    position: 'absolute',
    top: '30%',
    left: '45%',
    width: '30%', // Adjust width as needed
    padding: '20px',
    fontSize: 'large',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow for depth
    cursor:'pointer'
  };

  return (
    <div>
      <HomeNavbar />
      <div style={homeStyles}>
        <img 
          src="https://www.freeiconspng.com/thumbs/laptop-png/laptop-png-31.png" 
          alt="Laptop" 
          style={imageStyles} 
        />
        <div style={contentStyles}>
          <h1>Revolutionize Your Exams</h1>
          <p>
            Experience the future of online examinations with blockchain technology.
            Our platform ensures secure, transparent, and tamper-proof assessments,
            providing a fair and trustworthy exam environment for all users.
          </p>
          <p>
            Embrace cutting-edge solutions and make your exams seamless and reliable
            with the power of blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
