import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReadProducts from '../Read/ReadProducts'
import DashboardLayout from '../../../layout/DashboardLayout'
import type { GetProducts } from '../../../interface/interface'

const DashBoard = () => {

  const [data, setData] = useState<Array<GetProducts>>([{
    id:0,
    name:"",
    price:0,
    image_url: "",
    created_at:"",
  }])
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  return (
    <DashboardLayout>
      <ReadProducts  />
    </DashboardLayout>
  )
}

export default DashBoard