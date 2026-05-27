import { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import "../Create/AddedProduct.css"
import Form from '../../shared/Form'
import type { GetProducts, input, productData } from '../../../interface/interface'
import { FetchProduct } from '../../../fetch/fetch'
const EditProduct = () => {
  const initialData: productData = {
    name: "",
    price: "",
    image: undefined,
  }
  const {id}=useParams()
  const [data,setData]=useState<productData>(initialData)
  const [product,setProduct]=useState<GetProducts>({
    id:0,
    name:"",
    price:0,
    image_url:"",
    created_at:""
  })
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchData=async()=>{
        setProduct(await FetchProduct(id))
    }
    fetchData()
  },[id])

    const inputs:Array<input>=[
    {
     type:"text",
     placeholder:"Enter the product name",
     label:"Name",
     name:"name",
     value:product.name,
     colSpan:2,
    },
    {
     type:"text",
     placeholder:"Enter the product price",
     label:"Price",
     name:"price",
     value:product.price,
     colSpan:2
    },
    {
     type:"file",
     label:"Image",
     name:"image",
     value:product.image_url,
     colSpan:1
    },
  ]
  
  console.log(data)
  
    useEffect(()=>{
    const body = new FormData()
    body.append("name", data.name!="" ? data.name : product.name)
    body.append("price", data.price!="" ? data.price : String(product.price))
    if (data.image) {
      body.append("image", data.image==undefined ? product.image_url : data.image)
    }
    body.append("_method", "PUT")

    fetch(`https://dashboard-i552.onrender.com/api/items/${id}` ,{
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token")!,
        "accept": "application/json"
      },
      body
    })
    }, [data])

 
  return (
    <DashboardLayout>
        <div className="Added-product-container">
            <div className="image" onClick={()=>{
            navigate("/dashboard")
        }}>
            <img src="/Back.png" alt="" />
        </div>
        <p>EDIT ITEM</p>
        </div>
        <Form
          key={product.id}
          inputs={inputs}
          btnText="Save"
          classname='Edit'
          setData={setData}
          initialData={initialData}
        />
    </DashboardLayout>
  )
}

export default EditProduct