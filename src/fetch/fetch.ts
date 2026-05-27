import type { GetProducts } from "../interface/interface"

 export const FetchProducts = () => {
 return fetch("https://dashboard-i552.onrender.com/api/items", {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("token")!,
        "Accept": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    }
  
export const FetchProduct=(id:string|undefined):Promise<GetProducts>=>{
      return fetch(`https://dashboard-i552.onrender.com/api/items/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":localStorage.getItem("token")!,
                    "accept":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((res)=>{
                
                res.created_at=new Date(res.created_at).toLocaleDateString()
                res.updated_at=new Date(res.updated_at).toLocaleDateString()
                return res
            })
            .catch((err)=>console.log(err))
            
}