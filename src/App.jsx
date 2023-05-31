// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
// import Logout, { loader as logoutLoader } from './pages/Logout'
import Town2 from './pages/Town2'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Error from './components/Error'
// import { UserContext } from './context/UserContext'

import { checkAuth } from './utils'

import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
  Route, 
} from 'react-router-dom'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>} errorElement={<Error/>}>
    <Route index element={<Home/>}/>
    <Route path="about" element={<About />} />
    <Route 
      path="login" 
      element={<Login />} 
      loader={loginLoader}
      action={loginAction} 
    />
    {/* <Route 
      path="logout"
      element={<Logout />} 
      loader={logoutLoader} 
    /> */}
    <Route 
      path="town2" 
      element={<Town2 />} 
      loader={async ({ request }) => {
        await checkAuth(request)
        return null
      }}
    />
    <Route path="*" element={<NotFound />}/>
  </Route>
))

function App() {
    
  return (
    <RouterProvider router={router}/>
  )
}

export default App
