import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './about.tsx'
import Register from './register.tsx'
import Login from './login.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../context/authContext.tsx'

// Router setup
const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/about', element: <About />},
  {path: '/register', element: <Register />},
  {path: '/login', element:<Login /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
