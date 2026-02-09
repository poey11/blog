import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../context/authContext.tsx'
import './index.css'
import App from './App.tsx'
import About from './about.tsx'
import Register from './register.tsx'
import Login from './login.tsx'
import Create from './create.tsx'
import View from './view.tsx'
import Edit from './edit.tsx'
import Profile from './profile.tsx'

// Router setup
const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/about', element: <About />},
  {path: '/register', element: <Register />},
  {path: '/login', element:<Login /> },
  {path: '/create', element: <Create />},
  {path: '/view/:id', element: <View />},
  {path: '/edit/:id', element: <Edit />},
  {path: '/profile/:id', element: <Profile />},

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
