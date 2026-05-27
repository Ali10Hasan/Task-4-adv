import React, { type ReactNode } from 'react'
import Aside from '../components/constant/Aside'
import { AsideInfo } from '../data'
import '../components/pages/Dashboard/DashBoard.css'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = JSON.parse(localStorage.getItem('user')!)

  return (
    <div className="dashboard-container">
      <div className="Aside-Container">
        <Aside
          logo="/logo1.png"
          image={user.profile_image_url}
          name={user.user_name}
          AsideInfo={AsideInfo}
        />
      </div>
      <div className="ReadProducts-Container">{children}</div>
    </div>
  )
}

export default DashboardLayout
