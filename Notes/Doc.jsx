// State Management

/* 
State management refers to the practice of controlling and maintaining the state of an application. In software development, especially in front-end development, "state" is the information or data that a component or application manages and responds to as the user interacts with it.

Key Concepts in State Management
State: The state is a snapshot of the data or UI at a given time. It represents the current condition of the application or its components, such as user inputs, API responses, or interface selections.

Types of State:

Local State: Managed within a single component, like a form input's value or the visibility of a modal.
Global State: Shared across multiple components, like user authentication status or theme settings.
Server State: Data fetched from an external server, such as API responses that need to be synchronized and cached.
UI State: Related to the visual interface, such as toggling between dark and light modes.
State Management Approaches:

Local State Management: Typically handled using state hooks (e.g., useState in React) or component-level state.
Global State Management: Tools and libraries like Redux, MobX, Vuex, and Context API (in React) help manage state across the application.
Server State Management: Libraries like React Query, SWR, and Apollo Client manage server-side data fetching, caching, and synchronization.
Common State Management Libraries
Redux: A popular state management library, especially in React, that follows the Flux architecture. It centralizes the state in a global store and uses reducers and actions to update the state.

MobX: A more flexible alternative to Redux that automatically tracks and updates the state, focusing on observables and reactions.

Context API (React): A built-in React feature that allows passing data through the component tree without using props. It’s useful for lightweight global state management.

Vuex: The official state management library for Vue.js, following a similar pattern to Redux but tailored for Vue applications.

Zustand: A small and fast state management library for React that is simpler than Redux and Context API.

Principles of State Management
Single Source of Truth: State should be centralized and managed from a single location to avoid inconsistencies.
Immutability: State updates should be performed in an immutable manner (returning a new state rather than modifying the existing one).
Predictability: The flow of how the state changes should be clear and predictable, often using pure functions.
State Management in Action
Consider a simple counter app:

Local State: The count value is stored in a component’s state.
Global State: The count could be managed globally if multiple components need to access or modify it.
Server State: If the count is fetched from an API, the app needs to manage the server data effectively.

 */

/////    Interceptors   ///////////

/* In React, interceptors are typically used in conjunction with HTTP libraries like Axios or Fetch to intercept and modify requests or responses before they are handled by your application. 
They are useful for handling tasks such as adding authentication tokens, logging requests, or handling errors globally.

1. Using Axios Interceptors in React

Axios is a popular HTTP client for making requests in React. It supports interceptors for requests and responses, 
allowing you to modify them globally before they reach your application logic.
 */

import axios from "axios";

// Create an Axios instance
const httpClient = axios.create({
  baseURL: "https://api.example.com", // Replace with your base URL
  timeout: 10000, // Set timeout
});

// Request Interceptor

httpClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available

    let token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error

    return Promise.reject(error);
  }
);

// Response Interceptor

httpClient.interceptors.response.use(
  (response) => {
    // Handle successful responses (e.g., you can log the response)

    return response;
  },
  (error) => {
    // Handle responses with errors (e.g., unauthorized access, server errors)

    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      // logout or redirect to login
      console.log("Unauthorized, logging out");
    }
    return Promise.reject(error);
  }
);

export default httpClient;


///
import React, { useEffect, useState } from 'react';
import httpClient from './httpClient';

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    httpClient
      .get('/data') // Replace with your endpoint
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetchingComponent;


/////////// using Fetch with react 

const customFetch = async (url, options = {}) => {
    // Request Interceptor Logic
    const token = localStorage.getItem('authToken');
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
  
    try {
      const response = await fetch(url, { ...options, headers });
  
      // Response Interceptor Logic
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized errors
          console.log('Unauthorized, logging out...');
          // Redirect to login or handle logout
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json(); // Return the parsed JSON
    } catch (error) {
      // Handle network or other errors
      console.error('Fetch Error:', error);
      throw error;
    }
  };
  
  export default customFetch;

  ////in component

  import React, { useEffect, useState } from 'react';
import customFetch from './customFetch';

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    customFetch('https://api.example.com/data') // Replace with your endpoint
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetchingComponent;


/* 
 When to Use Interceptors in React
Authentication: Automatically attach tokens to every request.
Error Handling: Handle errors in a centralized manner, such as logging out on 401 responses or displaying global error messages.
Request Logging: Log all outgoing requests and responses for debugging.
Global Loading State: Track and display a loading indicator globally when an API request is in progress.
*/






