import type { AsideProps } from '../../interface/interface'
import "../pages/Dashboard/DashBoard.css"
import { NavLink, useNavigate } from 'react-router-dom'
const Aside = ({logo,image, name, AsideInfo}:AsideProps) => {
    const normalitem=AsideInfo.slice(0,AsideInfo.length-1)
    const lastitem=AsideInfo[AsideInfo.length-1]
    const navigate=useNavigate()
    const logout=()=>{
        fetch("https://dashboard-i552.onrender.com/api/logout",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json"
            },

        })
        .then((res)=>res.json())
        .then((res)=>{
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/")
        })
    }
  return (
    <div className='aside-content'>
        <div className="aside-header">
            <div className="logo">
                 <img src={logo} alt="" />
            </div>
           
            <div className="personal-info">
                <img src={image} alt="" />
                <h3>{name}</h3>
            </div>
        </div>
        <div className="aside-body-container">
            <div  className="aside-items">
                {normalitem.map((item,index)=>{
                    return (
                    <NavLink  className={({isActive})=>` aside-item ${isActive?"active":""}`} key={index} to={item.path}>
                        <img src={item.icone} alt="" />
                        <p>{item.item}</p>
                    </NavLink>
                    )
                })}
                
            </div>
            <div className='aside-last-item' onClick={logout}>
                    <p >{lastitem.item}</p>
                    <img src={lastitem.icone} alt="" />
                </div>
                
        
            
        </div>
    </div>
  )
}

export default Aside