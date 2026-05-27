import Form from "../shared/Form"
import type {  userData } from "../../interface/interface"
import "../shared/Form.css"
import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { logininputs} from "../../data"
const SignIn = () => {
  const navigate=useNavigate()
  const initialData: userData = {
    email:"",
    password:"",
  }
  const [data,setData]=useState<userData>(initialData)
  useEffect(()=>{
    const login=()=>{
      if(data.email && data.password){
        const body=new FormData();
        body.append("email",data.email);
        body.append("password",data.password);
        fetch("https://dashboard-i552.onrender.com/api/login",{
                  method:"POST",
                  headers:{
                      "accept":"application/json",
                  },
                  body
              })
              .then(res=>res.json())
              .then(res=>{ 
                if(res.token) {
                  localStorage.setItem("token",`Bearer ${res.token}`)
                  localStorage.setItem("user",JSON.stringify(res.user))
                  navigate("/dashboard")
                }
              })
              .catch((err)=>console.log(err))
      }}
      login();
  },[data])
  
  return (
    <div className="sign-page">
        <div className="form-container">
             <Form
            logo="/logo.png"
            title="SIGN IN"
            subTitle="Enter your credentials to access your account"
            inputs={logininputs}
            btnText="Sign In"
            hint="Dont't have an account? "
            actionText="Create One"
            classname="signin-form"
            setData={setData}
            initialData={initialData}
        />
        </div>
       
    </div>
  )
}

export default SignIn