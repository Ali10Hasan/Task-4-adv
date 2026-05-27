import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import type { GetProducts } from '../../../interface/interface'
import "./ShowElemnt.css"
import { FetchProduct, FetchProducts } from '../../../fetch/fetch'
const ShowElemnt = () => {
    const resolveImageUrl = (url: string) => {
        if (!url) return ""
        if (url.startsWith("http://dashboard-i552.onrender.com")) {
            return url.replace("http://", "https://")
        }
        return url
    }
    const {id}=useParams()
    const navigate=useNavigate()
    const [data ,setData]=useState<GetProducts>({
        id:0,
        name:"",
        price:0,
        image_url:"",
        created_at:"",
        updated_at:""
    })
    useEffect(()=>{
        const GetProduct=async ()=>{
             setData(await FetchProduct(id))
           
        }
        GetProduct()
    },[])
  return (
    <DashboardLayout>
        <div className="show-element-container">
        <div className="image" onClick={()=>{
            navigate("/dashboard")
        }}>
            <img src="/Back.png" alt="" />
        </div>
        <div className="product-details">
            <h2>{data.name}</h2>
            <img src={resolveImageUrl(data.image_url)} alt="" 
            onError={(e)=>{
                e.currentTarget.src="/DefaultImage.png"
            }}
            />
            <div className='sub-details'>
            <h2>Price: <span>{data.price}$</span></h2>
            <h2>Added At: <span>{data.created_at}</span></h2>
            </div>
            <h2>Updated At: <span>{data.updated_at}</span></h2>
        </div>
            
        </div>
    </DashboardLayout>
  )
}

export default ShowElemnt