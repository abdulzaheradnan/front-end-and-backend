import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from "yup"
import { Errorcomponent } from './Errorcomponent'
import {Signin} from "./signin"
import axios from 'axios'
function App() {
  const [signup,setsignup]=useState(true)
  const [data,setdata]=useState({})
const initialValues={
  username:"",
  password:""
}


const valiationSchema=Yup.object({
  username:Yup.string().required("required"),
  password:Yup.string().required("required")
})
const onSubmit=(values:any,{resetForm}:any )=>{
  console.log(values)
  setdata(values)
  axios.post("http://localhost:4000/signin",{username:values.username,password:values.password})
  .then((response)=>{
    console.log(response.data)

  })
  resetForm()
  if(values){
    setsignup(false)

  }else{
    setsignup(true)
  }

}
const fetchdata=()=>{
  axios.get("http://localhost:4000/data")
  .then((response)=>{
    console.log("bha ibhai",response.data.data)
  })
}
useEffect(()=>{

  fetchdata()
},[])

console.log("hre ",data.username)

  return (
    <div>
{signup==true ? 
      <div className='maincontainer'>
      <Formik
      initialValues={initialValues}
      validationSchema={valiationSchema}
      onSubmit={onSubmit}
      >

      <Form action="">

        <div className='inputcontainer'>

        <label htmlFor="">user name</label>&nbsp;
        <Field name="username" type="text" placeholder="enter your name" ></Field><br />
        <ErrorMessage name='username' component={Errorcomponent}></ErrorMessage>
        </div>
        <div className='inputcontainer'>

        <label htmlFor="">password</label>&nbsp;
        <Field name="password" type="password" placeholder="enter password"></Field><br />
        <ErrorMessage name='password' component={Errorcomponent}></ErrorMessage>
        </div>
        <div className='inputcontainer'>

        <button style={{background:"black",color:"white"}} type='reset'  >cancel</button>&nbsp;
        <button type='submit' style={{background:"black",color:"white"}} >ok</button>
        </div>

      </Form>
      </Formik>
     </div>:
      <Signin value={data}></Signin>}
      
    </div>
  )
}

export default App
