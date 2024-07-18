import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Errorcomponent } from './Errorcomponent'
import { Signin } from "./signin"
import axios from 'axios'
import {Login} from "./login"
function App() {
  const [signup, setsignup] = useState(true)
  const [signup2,setsignup2]=useState(true)
  const [data, setdata] = useState({})
  const [savetoken,setsavetoken]=useState("")
  const initialValues = {
    username: "",
    password: ""
  }


  const validationSchema = Yup.object({
    username: Yup.string().required("required"),
    password: Yup.string().required("required")
  })
  const onSubmit = (values: any, { resetForm }: any) => {
    console.log(values)
    setdata(values)
    axios.post("http://localhost:4000/signin", { username: values.username, password: values.password })
      .then((response) => {
        console.log(response.data.message,"token",response.data.token)
        setsavetoken(response.data.token)
      })
    resetForm()
    if (values) {
      setsignup(false)

    } else {
      setsignup(true)
    }

  }
  const fetchdata = () => {
    axios.get("http://localhost:4000/data")
      .then((response) => {
        console.log("bha ibhai", response.data.data)
      })
  }
  useEffect(() => {

    fetchdata()
  }, [])
  localStorage.setItem("newuser",JSON.stringify(savetoken))


  // console.log("hre ", data.username)
  const item =JSON.parse(localStorage.getItem("newuser"))
  // useEffect(()=>{

  // },[item])

  return (
    <div>
      {signup==true? 
        <div className='maincontainer'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >

            <Form action="">
              <h3>sign up</h3>
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

                <button style={{ background: "black", color: "white" }} type='reset'  >cancel</button>&nbsp;
                <button type='submit' style={{ background: "black", color: "white" }} >ok</button>
              </div>

            </Form>
          </Formik>
        </div> :
        <div>
          {
            signup2==true ? 
          
        <Login value={data} signup2={signup2} setsignup2={setsignup2} token={item}></Login>:
        <Signin value={data}></Signin>}
        </div>}

    </div>
  )
}

export default App
