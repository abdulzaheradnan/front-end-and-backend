import React from 'react'
import { Formik ,Form,Field,ErrorMessage} from 'formik'
import { Errorcomponent } from './Errorcomponent'
import * as Yup from "yup"
import axios from 'axios'
export const Login = (props) => {
const {username,password}=props.value
const {signup2,setsignup2,token}=props
    const initialValues={
        username:"",
        password:""
    }

    const validationSchema=Yup.object({
        username:Yup.string().required("required"),
        password:Yup.string().required("required")
    })

    const onSubmit=(values)=>{
        console.log("login data",values)
        if(values){
            setsignup2(false)

        }else{
            setsignup2(true)
        }
            const url="http://localhost:4000/login"
            axios.post(url,{token:token,message:"this is main token"})
            .then((response)=>{
                console.log("from login file",response.data)

            })
        

    }
    console.log("from signup",username)
    
    console.log("login file",token)


  return (
    <div>
{username ?
         <div className='maincontainer2'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >

            <Form action="">
    <p style={{color:"red"}}>you have successfully signup</p>
              <h3>login</h3>
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
       
       </div>:
       <div></div>}
          </div>
  )
}
