
import Home from './pages/Home'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
import Signup, { loader as signupLoader, action as signupAction } from './pages/Signup'
import Logout, { loader as logoutLoader } from './pages/Logout'
import Forum, { loader as forumLoader } from './pages/forum/Forum'
import Profile, { loader as profileLoader, action as profileAction } from './pages/forum/Profile'
import UserProfile, { loader as userProfileLoader } from './pages/forum/UserProfile'
import ForumSection, { loader as forumSectionLoader, action as forumSectionAction } from './pages/forum/ForumSection'
import ForumThread, { loader as forumThreadLoader, action as forumThreadAction } from './pages/forum/ForumThread'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ForumLayout from './components/ForumLayout'
import Error from './components/Error'

import { checkAuth } from './utils'

import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
  Route, 
} from 'react-router-dom'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout/>} errorElement={<Error/>}>
      <Route index element={<Home/>}/>
      <Route 
        path="login" 
        element={<Login />} 
        loader={loginLoader}
        action={loginAction} 
      />
      <Route 
        path="signup"
        element={<Signup />} 
        loader={signupLoader} 
        action={signupAction} 
      />
      <Route 
        path="logout"
        element={<Logout />} 
        loader={logoutLoader} 
      />
      <Route path="*" element={<NotFound />}/>
    </Route>
    <Route 
      path="forum" 
      element={<ForumLayout />} 
      loader={async ({ request }) => {
        await checkAuth(request)
        return null
      }}
      errorElement={<Error/>}
    >
      <Route 
        index 
        element={<Forum/>}
        loader={forumLoader}
      />
      <Route 
        path=':section' 
        element={<ForumSection/>}
        loader={forumSectionLoader}
        action={forumSectionAction}
      />
      <Route 
        path=':section/:post' 
        element={<ForumThread/>}
        loader={forumThreadLoader}
        action={forumThreadAction}
      />
      <Route 
        path="profile" 
        element={<Profile/>}
        loader={profileLoader}
        action={profileAction}
      />
      <Route 
        path="profile/:user" 
        element={<UserProfile/>}
        loader={userProfileLoader}
      />
    </Route>
  </Route>
))

function App() {
    
  return (
    <RouterProvider router={router}/>
  )
}

export default App
