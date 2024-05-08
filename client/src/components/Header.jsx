import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import {Link,useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon,FaSun} from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice';
import {signoutSuccess} from '../redux/user/userSlice.js'


const Header = () => {
    const path=useLocation().pathname;
    const dispatch=useDispatch();
    const {currentUser}=useSelector(state=>state.user)
    const {theme}=useSelector((state)=>state.theme);

    const handleSignOut=async()=>{
        try{
          const res=await fetch('api/user/signout',{
            method:'POST',
          });
          const data=await res.json();
          if(!res.ok){
            console.log(data.message);
          }else{
             dispatch(signoutSuccess());
          }
        }catch(error){
         console.log(error.message);
        }
      }
  return (
    <Navbar className='border-b-2'>
         <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>{/*text-small is set at default and for small above screens  text size is set large */}
            <span className='px-2 py-1 bg-cyan-500 rounded-lg text-white'>
                Your
            </span>
            Blog
        </Link>
        <form>
            <TextInput type='text' placeholder='Search' rightIcon={AiOutlineSearch} className='hidden lg:inline'/>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray'>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
             <Button className='w-12 h-10 hidden sm:inline' color='gray' onClick={()=>dispatch(toggleTheme())}>    {/*default is hidden but in larger screen the icon is visible */}
             {theme === 'light' ? <FaMoon /> : <FaSun/>}
            </Button>
            {currentUser?(
                <Dropdown arrowIcon={false} inline label={<Avatar
                    alt='user'
                    img={currentUser.profilePicture}
                    rounded
                />} >
                <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
                 
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Dropdown>
            ):(
                <Link to='/sign-in'>
                <Button  gradientDuoTone='purpleToBlue' outline>
                    Sign In
                </Button>
            </Link>)}
            
             <Navbar.Toggle/>{/*Navbar wale code ko collapse kar dega us icon ko isi div mai rakhna tha isliye yaha type kiya otherwise waha bhi type kar sakte the */}
        </div>
        <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/' >Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"}  as={'div'}>
                    <Link to='/about' >About Creator</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"}  as={'div'}>
                    <Link to='/projects' >Blogs</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header