import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'

let loggedIn=localStorage.getItem('loggedIn');

console.log(loggedIn)

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: loggedIn ? <App /> : <Login/>,
  },
  {
    path: "/login",
    element: !loggedIn ? <Login /> : <App/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
