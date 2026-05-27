import { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import "./AddedProduct.css"
import Form from '../../shared/Form'
import type { input, productData } from '../../../interface/interface'
const AddedProduct = () => {
  const initialData: productData = {
    name: "",
    price: "",
    image: undefined,
  }
  const [data,setData]=useState<productData>(initialData)
  const navigate=useNavigate()
    const inputs:Array<input>=[
    {
     type:"text",
     placeholder:"Enter the product name",
     label:"Name",
     name:"name",
     colSpan:2
    },
    {
     type:"text",
     placeholder:"Enter the product price",
     label:"Price",
     name:"price",
     colSpan:2
    },
    {
     type:"file",
     label:"Image",
     name:"image",
     colSpan:1
    },
  ]
  useEffect(()=>{
    if (!data.name || !data.price || !data.image) {
      return
    }

    const body = new FormData()
    body.append("name", data.name)
    body.append("price", data.price)
    body.append("image", data.image)

    fetch("https://dashboard-i552.onrender.com/api/items",{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "accept": "application/json"
      },
      body: body
    })
  },[data])
  return (
    <DashboardLayout>
        <div className="Added-product-container">
            <div className="image" onClick={()=>{
            navigate("/dashboard")
        }}>
            <img src="/Back.png" alt="" />
        </div>
        <p>ADD NEW ITEM</p>
        </div>
        <Form
          inputs={inputs}
          btnText="Save"
          classname='Added'
          setData={setData}
          initialData={initialData}
        />
    </DashboardLayout>
  )
}

export default AddedProduct