import type { Dispatch, SetStateAction } from "react";
import type { GetProducts } from "../../../interface/interface";
import "./DeletePop.css"
const DeletePop = ({
  deleteProduct,
  setDeleteProduct,
  onDeleted,
}: {
  deleteProduct: GetProducts
  setDeleteProduct: Dispatch<SetStateAction<GetProducts>>
  onDeleted: (id: number) => void
}) => {
    const DeleteProduct = async () => {
        if (!deleteProduct.id) return
        try {
            const res = await fetch(`https://dashboard-i552.onrender.com/api/items/${deleteProduct.id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":localStorage.getItem("token")!,
                    "Accept":"application/json",
                }
            })
            if (!res.ok) return
            onDeleted(deleteProduct.id)
            setDeleteProduct({
                id:0,
                name:"",
                price:0,
                image_url: "",
                created_at:"",
                updated_at:"",
            })
        } catch (err) {
            console.error(err)
        }
    }
    const cancel=()=>{
        setDeleteProduct({
                id:0,
                name:"",
                price:0,
            image_url: "",
                created_at:"",
                updated_at:"",
        })
    }
  return (
    <div className={`delete-container ${deleteProduct.name?"show":""}`}>
        <h3>Are you sure you want to delete the product?</h3>
        <div className="btn-control">
            <button onClick={DeleteProduct}>Yes</button>
            <button onClick={cancel}>No</button>
        </div>
        
    </div>
  )
}

export default DeletePop