import React from 'react'
import Home from './pages/Home';
import About from './pages/About.jsx';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute .jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes> 
    <Route path="/" element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
    <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:postId" element={<UpdatePost/>}/>
    </Route>
   
    
    <Route path="/projects" element={<Projects/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App