<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
// import App from './App.jsx'
// import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Report from './Components/Report/Report.jsx'
// import Dashboard from './Components/Dashboard/Dashboard.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/report' element={<Report />} />
      {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      {/* <Route path='contact' element={<Contact />} /> */}
      {/* <Route path='user/:userid' element={<User />} /> */}
    </>
  )
)

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App.jsx';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> 9f3000a8aa357c73acb794ac49e69729cadb1c38
