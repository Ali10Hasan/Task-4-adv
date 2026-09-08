import Form from "../shared/Form"
import type {  ShowAlertType, userData } from "../../interface/interface"
import "../shared/Form.css"
import {useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { logininputs} from "../../data"
import axios from "axios"

const SignIn = () => {
  const navigate=useNavigate()
  const {showAlert} = useOutletContext<ShowAlertType>(); 
 
  const initialData: userData = {
    email:"",
    password:"",
  }
  const [data,setData]=useState<userData>(initialData)
  useEffect(()=>{
    const login=()=>{
      if(data.email && data.password){
        // const body=new FormData();
        // body.append("email",data.email);
        // body.append("password",data.password);
        axios.post("https://dashboard-i552.onrender.com/api/login", data, {
                  headers:{
                      "accept":"application/json",
                  }
              })
              .then(res => { 
                const responseData = res.data;
                if(responseData.token) {
                  localStorage.setItem("token",`Bearer ${responseData.token}`)
                  localStorage.setItem("user",JSON.stringify(responseData.user))
                  
                  // إظهار إشعار النجاح
                  showAlert("Login successful", "success");
                  
                  // تأخير الانتقال لمدة ثانية ونصف لرؤية الإشعار براحة
                  setTimeout(() => {
                    navigate("/dashboard")
                  }, 1500);
                }
              })
              .catch(err => {
                console.log("Hi", err);
                const errorMsg = err.response?.data?.msg || err.message || "فشل تسجيل الدخول";
                showAlert(errorMsg, "error");
              })
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
