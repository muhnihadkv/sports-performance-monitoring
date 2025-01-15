import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css';
import { Link, Route, Routes } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
 
  const eventsPerDayData = {
    labels: ['2024-09-01', '2024-09-02', '2024-09-03'],
    datasets: [
      {
        label: 'Events Per Day',
        data: [8.4, 9.0, 8.8],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  const athletesCreatedPerDayData = {
    labels: ['2024-09-01', '2024-09-02', '2024-09-03'],
    datasets: [
      {
        label: 'Athletes Created Per Day',
        data: [3.7, 4.0, 4.2],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
    ],
  };

  const coachesCreatedPerDayData = {
    labels: ['2024-09-01', '2024-09-02', '2024-09-03'],
    datasets: [
      {
        label: 'Coaches Created Per Day',
        data: [3.7, 4.0, 4.1],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="navbar1">
                <h1 className="logo1">Athletics</h1>
                <nav>
                    <ul className="navbar-links1">
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/event">Events</Link></li>
                        <li><Link to="/result">Results</Link></li>
                        <li><Link to="/coaches">Coaches</Link></li>
                        <li><Link to="/athelete">Athletes</Link></li>
                        <li><Link to="/admindashboard">Profile</Link></li>
                        <li><Link to="/home">Logout</Link></li>
                    </ul>
                </nav>
</header>
      <div className="card-container1">
        <div className="card1">
          <h2>Total Events</h2>
          <p>9</p>
        </div>
        <div className="card1">
          <h2>Total Athletes</h2>
          <p>4</p>
        </div>
        <div className="card1">
          <h2>Total Coaches</h2>
          <p>4</p>
        </div>
      </div>

      <div className="chart-container1">
        <div className="chart">
          <h3>Events Per Day</h3>
          <Line data={eventsPerDayData} />
        </div>
        <div className="chart">
          <h3>Athletes Created Per Day</h3>
          <Line data={athletesCreatedPerDayData} />
        </div>
        <div className="chart">
          <h3>Coaches Created Per Day</h3>
          <Line data={coachesCreatedPerDayData} />
        </div>
        
      </div>
      <Routes>
                <Route path="/news" element={<h2>News Page</h2>} />
                <Route path="/events" element={<h2>Events Page</h2>} />
                <Route path="/results" element={<h2>Results Page</h2>} />
                <Route path="/coaches" element={<h2>Coaches Page</h2>} />
                <Route path="/athletes" element={<h2>Athletes Page</h2>} />
                <Route path="/profile" element={<h2>Profile Page</h2>} />
                <Route path="/logout" element={<h2>Logging out...</h2>} />
            </Routes>
    </div>
    
  );
};

export default Dashboard;
