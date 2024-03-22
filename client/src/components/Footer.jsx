import React from 'react'
import {Footer} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
        <div className="mt-5">
        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-lg font-semibold dark:text-white'>{/*text-small is set at default and for small above screens  text size is set large */}
            <span className='px-2 py-1 bg-cyan-500 rounded-lg text-white'>
                Your
            </span>
            Blog
        </Link>
         </div>
         <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.Title title='Projects'/>
            <Footer.LinkGroup col>
            <Footer.Link
                  href='https://github.com/samarth-6'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/samarth-mishra-425372249/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Linked In
                </Footer.Link>
            </Footer.LinkGroup>
         </div>
         <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.Title title='Follow Me'/>
            <Footer.LinkGroup col>
            <Footer.Link
                  href='https://todo-new-ochre.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   ToDo
                </Footer.Link>
                <Footer.Link
                  href='https://weather-web-beryl.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Weather Web
                </Footer.Link>
            </Footer.LinkGroup>
         </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href='#' by="Samarth's blog" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/samarth-6' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
        </div>
        </div>
    </Footer>
  )
}

export default FooterCom