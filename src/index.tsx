import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom';
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


// Add a request interceptor
axios.interceptors.request.use((request: any) => {
  return request;
}, (error: any) =>{
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response: any) {
    return response;
  }, function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      if (!window.location.href.includes("/login")) {
        window.location.href = "/login"; // redir to login page
      }
    }
    return Promise.reject(error);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
