import React from 'react'
import {  useSelector } from 'react-redux'
import {Outlet , Navigate} from 'react-router-dom'

export default function OnlyAdminPrivateRoute() {
    const {currentUser}=useSelector((state)=>state.user)
  return currentUser && currentUser.isAdmin? <Outlet/>:<Navigate to='/sign-in'/>;
}
//this is for like when if we haven't signed in then it won't allow us to go to dashboard until we sign in
//if i try to go to dashboard without signin then it will redirect me to sign in page