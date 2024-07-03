import React from 'react'


export const Signin = (props) => {
    console.log(props.value,"here")
    const {username,password}=props.value
  return (
    <div >
        {username ? 
        <div className='signincontainer'>
        <h2>WELCOME MR {username.toString().toUpperCase()}</h2>
        <h4>you have sign in succesfully</h4>
        </div>: ""}
    </div>
  )
}
