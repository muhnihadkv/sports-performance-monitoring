import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';

const newsArticles = [
  {
    title: "Olympics 2024: New Records Set",
    description: "In an exhilarating event, athletes from around the world set new records, highlighting their dedication and skill.",
    date: "2024-10-25",
  },
  {
    title: "World Athletics Championships: A Recap",
    description: "The World Athletics Championships wrapped up with thrilling performances and unexpected results.",
    date: "2024-10-20",
  },
  {
    title: "Basketball Star Wins MVP",
    description: "The NBA's MVP award goes to an underdog, showcasing his remarkable journey and hard work.",
    date: "2024-10-15",
  },
  {
    title: "Football League Finals: An Epic Showdown",
    description: "The final match of the football league featured a nail-biting finish, bringing fans to their feet.",
    date: "2024-10-10",
  },
  {
    title: "Tennis Champion Retires",
    description: "A beloved tennis champion announces retirement after an illustrious career filled with accolades.",
    date: "2024-10-05",
  },
  {
    title: "Athlete Breaks Marathon Record",
    description: "A new marathon record is set as an athlete completes the course in an astounding time.",
    date: "2024-09-30",
  },
  {
    title: "Gymnastics: A New Rising Star",
    description: "A young gymnast shines in the national competition, captivating audiences with her performance.",
    date: "2024-09-25",
  },
  {
    title: "Swimming Championships: Highlights",
    description: "The swimming championships featured outstanding performances, with several athletes breaking personal bests.",
    date: "2024-09-20",
  },
  {
    title: "Rugby World Cup: Team Wins Final",
    description: "In a thrilling match, the rugby team clinches the World Cup title, bringing joy to their nation.",
    date: "2024-09-15",
  },
  {
    title: "Athletes Unite for Charity Event",
    description: "Top athletes come together to raise funds for charity, showcasing their commitment to social causes.",
    date: "2024-09-10",
  },
];

const News = () => {
  return (
    <div>
      <header className="navbar1">
        <h1 className="logo1">Athletics</h1>
        <nav>
          <ul className="navbar-links1">
            <li><Link to="/news">News</Link></li>
            <li><Link to="/event">Event</Link></li>
            <li><Link to="/results">Results</Link></li>
            <li><Link to="/coaches">Coaches</Link></li>
            <li><Link to="/atheletes">Athelete</Link></li>
            <li><Link to="/dashboard">Profile</Link></li>
            <li><Link to="/home">Logout</Link></li>
          </ul>
        </nav>
      </header>
      
      <div className="news-container">
        <h1>Latest News</h1>
        <div className="news-list">
          {newsArticles.map((article, index) => (
            <div className="news-card" key={index}>
              <h2 className="news-title">{article.title}</h2>
              <p className="news-description">{article.description}</p>
              <span className="news-date">{article.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
