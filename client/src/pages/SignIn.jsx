import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData,setFormData]=useState({});
  const {loading ,error:errorMessage}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please Fill Out All the Details'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      }); 
      const data=await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }   
    
  }
  return (
    <div className='min-h-screen flex  mt-24 flex-col' >
    <div className="  p-3 mx-auto text-center gap-5">
    {/* top */}
    <div className="flex-1 mb-10">
    <Link to="/" className='self-center  font-bold dark:text-white text-6xl'>{/*text-small is set at default and for small above screens  text size is set large */}
            <span className='px-2 py-1 bg-cyan-500 rounded-lg text-white'>
                My
            </span>
            Blog
        </Link>
        <p className="text-sm mt-5">
         
        </p>

    </div>
    {/* bottom */}
    <div className="flex-1">
    <form className="" onSubmit={handleSubmit}>
      <div className="mb-5">
      <Label className="font-semibold" value='Your Email'/>
      <TextInput type='email' placeholder='Email' id='email'  onChange={handleChange}/>

      </div>
      <div className="mb-5">
      <Label className="font-semibold" value='Your Password'/>
      <TextInput type='password' placeholder='********' id='password'  onChange={handleChange}/>

      </div>
      <div className="flex justify-center mt-5 flex-col gap-5">
      <Button outline gradientDuoTone="cyanToBlue" type='submit' disabled={loading}>
       {loading ? (
        <>
        {/* as there are two elements spinner and span we have to cover this in this arrow fragments */}
        <Spinner size='sm'/>
        <span className='pl-3'>Loading...</span>
      </> ) :' Sign In '}
      </Button>
     <OAuth/>
      </div> 
    </form>
    <div className="flex gap-2 justify-center text-sm mt-5">
      <span>Do not Have An Account?</span>
      <Link to='/sign-in' className='text-cyan-500'>
        Sign Up
      </Link>
    </div>
    {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
    </div>
    </div>
    </div>
  )
}

export default SignIn