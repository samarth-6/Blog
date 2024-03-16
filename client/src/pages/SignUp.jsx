import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'
import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='min-h-screen flex  mt-24 flex-col' >
    <div className="  p-3 mx-auto text-center gap-5">
    {/* top */}
    <div className="flex-1 mb-10">
    <Link to="/" className='self-center  font-bold dark:text-white text-6xl'>{/*text-small is set at default and for small above screens  text size is set large */}
            <span className='px-2 py-1 bg-cyan-500 rounded-lg text-white'>
                Your
            </span>
            Blog
        </Link>
        <p className="text-sm mt-5">
         
        </p>

    </div>
    {/* bottom */}
    <div className="flex-1">
    <form>
      <div className="mb-5">
      <Label className="font-semibold"value='Your Username'/>
      <TextInput type='text' placeholder='Username' id='username'/>

      </div>
      <div className="mb-5">
      <Label className="font-semibold" value='Your Email'/>
      <TextInput type='text' placeholder='Email' id='email'/>

      </div>
      <div className="mb-5">
      <Label className="font-semibold" value='Your Password'/>
      <TextInput type='text' placeholder='Password' id='password'/>

      </div>
      <div className="flex justify-center mt-5">
      <Button outline gradientDuoTone="cyanToBlue" type='submit'>
        Sign Up
      </Button>
      </div>
    </form>
    <div className="flex gap-2 justify-center text-sm mt-5">
      <span>Have An Account?</span>
      <Link to='/sign-in' className='text-cyan-500'>
        Sign In
      </Link>

    </div>
    </div>
    </div>
    </div>
  )
}

export default SignUp