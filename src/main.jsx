import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Musicplayer from "./Musicplayer.jsx";
import Signup from "./SignUp.jsx";
import SpotifyAuth from "./SpotifyAuth.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Profile from "./Profile.jsx";




// Router
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },


  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Musicplayer",
    element: (
      <ProtectedRoute>
        <Musicplayer element={<Musicplayer />}  />
      </ProtectedRoute>
    ),
  },
  {
    path: "/connect-spotify",
    element: (
      <ProtectedRoute>
        <SpotifyAuth />
      </ProtectedRoute>
    ),
  },
    {
    path: "/loading",
    element: (
      <ProtectedRoute>
        <LoadingScreen />
      </ProtectedRoute>
    ),
  },
    {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)

export default router;

