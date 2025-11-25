import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Musicplayer from "./Musicplayer.jsx";

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
  {
    path: '/Musicplayer',
    element: <Musicplayer/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
