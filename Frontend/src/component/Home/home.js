import React, { useEffect, useState } from 'react';
import './home.css';

const images = [
  { src: 'https://images.unsplash.com/photo-1540474211005-7c8a448f69e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 1' },
  { src: 'https://images.unsplash.com/photo-1637578371283-d9076f66ba8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
  { src: 'https://images.unsplash.com/photo-1668260920944-ec171ceb8633?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' },
  { src: 'https://images.unsplash.com/photo-1674834726923-3ba828d37846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4OTI2MjB8fGVufDB8fHx8fA%3D%3D', alt: 'Image 4' },
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 5' },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = (url) => {
    const isLoggedIn = true;
    if (isLoggedIn) {
      window.location.href = url; // Navigate to external URL
    } else {
      alert('Please log in to access this feature.');
    }
  };

  return (
    <div>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <img src={image.src} alt={image.alt} style={{ width: '100%', height: '550px' }} />
          </div>
        ))}
      </div>

      <div className="about-section">
        <div className="about-header">
          <h2>About Us</h2>
          <div className="header-line"></div>
        </div>
        <p className="about-text">
          We are dedicated to promoting athletic excellence through a blend of tradition and innovation.
          Our mission is to inspire and empower athletes to achieve their highest potential by providing
          cutting-edge training programs, expert coaching, and unwavering support.
        </p>
        <p className="about-text">
          Beyond physical performance, we emphasize the importance of mental wellness, fostering a holistic approach
          to athlete development. At our core, we believe in building an inclusive community where individuals from
          all backgrounds can thrive, connect, and grow.
        </p>
        <p className="about-text">
          Together, we aim to push boundaries, redefine possibilities, and shape the future of athletics for generations to come.
        </p>
      </div>

      <h2 className="features-heading">Explore Features</h2>

      <div className="cards-container">
        <div className="card" onClick={() => handleCardClick('https://www.upwork.com/resources/administrative-skills')}>
          <img src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" alt="Admin" />
          <h3>Admin</h3>
          <p>Manage Events, Meet, Results.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('https://www.tandfonline.com/doi/full/10.1080/09669582.2021.1942480')}>
          <img src="https://starjournalnow.com/wp-content/uploads/2018/07/EVENTS-GRAPHIC_web.jpg" alt="Events" />
          <h3>Events</h3>
          <p>Explore upcoming events.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('https://www.nytimes.com/athletic/uk/')}>
          <img src="https://thumbs.dreamstime.com/z/athletics-young-man-player-vector-sportsman-win-concept-various-race-competition-hurdle-long-jump-flat-athlete-cartoon-119326401.jpg" alt="Athletes" />
          <h3>Athletes</h3>
          <p>Learn about our athletes.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('https://hbr.org/2019/11/the-leader-as-coach')}>
          <img src="https://img.freepik.com/premium-vector/cartoon-coach-training-teaching-kids-playing-football_179970-4791.jpg?w=2000" alt="Coaches" />
          <h3>Coaches</h3>
          <p>Meet our coaches.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('https://www.reuters.com/sports/athletics/')}>
          <img src="https://w7.pngwing.com/pngs/906/671/png-transparent-newspaper-editorial-cartoon-headline-comics-white-cartoon.png" alt="News" />
          <h3>News</h3>
          <p>Stay updated with the latest news.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('https://scientific-publishing.webshop.elsevier.com/manuscript-preparation/')}>
          <img src="https://tse4.mm.bing.net/th?id=OIP.nt7B228gNJSlDe5HrPW8YgHaEK&pid=Api&P=0&h=180" alt="Results" />
          <h3>Results</h3>
          <p>Check the latest results.</p>
        </div>
      </div>
<div>
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">About Us</a></li>
            <li><a href="/home">Events</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <strong>Email:</strong> support@athletics.com
          </p>
          <p>
            <strong>Phone:</strong> +1-800-123-4567
          </p>
          <p>
            <strong>Location:</strong> 123 Athletic Way, Sports City
          </p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://img.generation-nt.com/facebook_04B0032001662445.png" target="_blank" rel="noopener noreferrer" className="facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="http://pluspng.com/img-png/twitter-logo-png-logo-twitter-in-png-2500.png" target="_blank" rel="noopener noreferrer" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://static.vecteezy.com/system/resources/previews/018/930/413/large_2x/instagram-logo-instagram-icon-transparent-free-png.png" target="_blank" rel="noopener noreferrer" className="instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://static.vecteezy.com/system/resources/previews/021/460/490/original/linkedin-logo-free-download-free-png.png" target="_blank" rel="noopener noreferrer" className="linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 Athletics Hub. All Rights Reserved.</p>
      </div>
    </footer>
  </div>

    </div>
  );
};

export default Home;
