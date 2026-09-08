import Form from "../shared/Form"
import type { userData } from "../../interface/interface"
import "../shared/Form.css"
import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {registerinputs} from "../../data"
const SignUp = () => {
  const navigate=useNavigate()
  const initialData: userData = {
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    password_confirmation:"",
    profile_image_url:undefined
  }
  const [data,setData]=useState<userData>(initialData)
  useEffect(()=>{
    
          if(data.email && data.first_name && data.last_name && data.password  && data.profile_image_url){
            console.log(data)
              const body=new FormData();
              body.append("email",data.email);
              body.append("password",data.password);
              body.append("password_confirmation",data.password_confirmation);
              body.append("first_name",data.first_name);
              body.append("last_name",data.last_name);
              body.append("user_name",data.first_name+" "+data.last_name);
              body.append("profile_image",data.profile_image_url);
              fetch("https://dashboard-i552.onrender.com/api/register",{
                  method:"POST",
                  headers:{
                      "accept":"application/json",
                      
                  },
                  body:body
              })
              .then(res=>res.json())
              .then(res=>{      
                  localStorage.setItem("token",`Bearer ${res.data.token}`)
                  localStorage.setItem("user",JSON.stringify(res.data.user))
                  navigate("/dashboard")
                
              })
              .catch((err)=>console.log(err))
          }
         
              
  },[data])
 
  
  return (
    <div className="sign-page">
        <div className="form-container">
             <Form
            logo="/logo.png"
            title="SIGN UP"
            subTitle="Enter your credentials to access your account"
            inputs={registerinputs}
            btnText="Sign Up"
            hint="Do you have an account?"
            actionText="Sign In"
            setData={setData}
            classname="signup-form"
            initialData={initialData}
        />
        </div>
       
    </div>
  )
}

export default SignUp