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