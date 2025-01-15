// src/services/apiService.js

const API_URL = 'https://your-api-url.com/api'; // Replace with actual API URL when available

// Mock data for testing without an API
const mockEvents = [
  { id: 1, eventTitle: "Mock Event 1", meetName: "Mock Meet A" },
  { id: 2, eventTitle: "Mock Event 2", meetName: "Mock Meet B" },
];

// Function to fetch events from the backend or use mock data
const getEvents = async () => {
  try {
    // Uncomment the code below when an API is available
    // const response = await fetch(`${API_URL}/events`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch events');
    // }
    // return await response.json();

    // Temporary mock data for offline testing
    return mockEvents;
  } catch (error) {
    console.error("Fetching events failed:", error);
    throw error;
  }
};

// Function to publish result (mocked for now)
const publishResult = async (eventId) => {
  try {
    // Uncomment the code below when an API is available
    // const response = await fetch(`${API_URL}/events/${eventId}/publish`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to publish result');
    // }
    // return await response.json();

    // Mock behavior
    console.log(`Result for event ID ${eventId} published successfully!`);
    return { message: "Mock result published" };
  } catch (error) {
    console.error("Publishing result failed:", error);
    throw error;
  }
};

// Export the functions for later use
export default {
  getEvents,
  publishResult,
};
