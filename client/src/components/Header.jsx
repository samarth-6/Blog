import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import {Link,useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';

const Header = () => {
    const path=useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
         <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>{/*text-small is set at default and for small above screens  text size is set large */}
            <span className='px-2 py-1 bg-blue-500 rounded-lg text-white'>
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
             <Button className='w-12 h-10 hidden sm:inline' color='gray'>    {/*default is hidden but in larger screen the icon is visible */}
                <FaMoon />
            </Button>
            <Link to='/sign-in'>
                <Button  gradientDuoTone='purpleToBlue' outline>
                    Sign In
                </Button>
            </Link>
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