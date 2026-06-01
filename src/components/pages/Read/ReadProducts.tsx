import React, { useEffect, useState } from 'react'
import type { GetProducts } from '../../../interface/interface'
import "../Dashboard/DashBoard.css"
import DeletePop from '../Delete/DeletePop'
import SkeletonProduct from '../../constant/SkeletonProduct'
import { useNavigate } from 'react-router-dom'
import { FetchProducts } from '../../../fetch/fetch'
const ReadProducts = () => {
    const resolveImageUrl = (url: string) => {

    if (!url) return ""
    if (url.startsWith("http://dashboard-i552.onrender.com")) {
      return url.replace("http://", "https://")
    }
    return url
  }
  const [data,setData]=useState<Array<GetProducts>>([])
  const [deleteProduct,setDeleteProduct]=useState<GetProducts>({
    id:0,
    name:"",
    price:0,
    image_url:"",
    created_at:"",
    updated_at:""
  })
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate=useNavigate()
  const getPageNumbers = (totalPages: number): (number | string)[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages];
        }
        if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };
  
  const getItemsPerPage = () => {
    if (window.innerWidth <= 1270 && window.innerWidth>=1090) return 6;
    if (window.innerWidth <= 1090) return 4; // للموبايل والشاشات الصغيرة
    return 8; // للشاشات الكبيرة
  };
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const pages = getPageNumbers(Math.ceil(data.length / itemsPerPage));

 
  
  useEffect(()=>{
    const fetchData = async () => {
      const products = await FetchProducts()
      setData(products)
      setLoading(false);
      console.log(products)
    }
    fetchData()
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  const onNext = () => {
      
      if(currentIndex < pages.length - 4){
          setCurrentIndex(currentIndex + 1);
      }
  }
  
  const onBack = () => {
      
      if(currentIndex > 0){
          setCurrentIndex(currentIndex - 1);
      }
  }

  const filteredProducts = data?.filter((item) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleDeleted = (id: number) => {
    setData((prev) => prev?.filter((item) => item.id !== id))
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  return (
    <div className="read-products-content">
      <div className="search-container">
        <input
          type="text"
          placeholder='Search products by name'
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <img src="/search.png" alt="" />
      </div>

      <div className="add-btn">
        <button onClick={()=>{
          navigate("/addedproduct")
        }}>ADD NEW PRODUCT</button>
      </div>
      <div className="products-container">
        {loading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonProduct key={index} />
            ))
        ) :
         (
          
           currentProducts?.map((item) => {
             return (
               <div className="product-card" key={item.id}>
              <DeletePop
                deleteProduct={deleteProduct}
                setDeleteProduct={setDeleteProduct}
                onDeleted={handleDeleted}
              />
              <div className='card-container' >
        <img src={resolveImageUrl(item.image_url)} alt="" 
        onError={(e)=>{
            e.currentTarget.src="/DefaultImage.png"
        }}
        />
        <div className="card-details">
            <h3 style={{cursor:"pointer"}}  onClick={()=>{
        navigate(`/showelement/${item.id}`)
    }}>{item.name}</h3>
            <div className="btns">
                <button onClick={()=>{
                    navigate(`/editproduct/${item.id}`)
                }}>Edit</button>
                <button style={{zIndex:10}} onClick={()=>{setDeleteProduct(item)}}>Delete</button>
            </div>
        </div>
        
    </div>
            </div>
          )
        })
        )}
      </div>

<div className="pagination">
        <div className="image" onClick={onBack}>
           <img src="/Prev.png" alt="" /> 
        </div>
       
        
        <div className="pagination-wrapper">
          <div className="pagination-window">
              {pages.map((page, index)=>{
                if (page === "...") {
                    return (
                        <span key={`dots-${index}`} className="dots">
                            ...
                        </span>
                    );
                }
                  return(
                    <div className="filter-btn" key={index}
                    >
                          <button 
                        
                        onClick={()=>{setCurrentPage(index + 1)}}
                        className={`btn ${currentPage === index + 1 ? "active" : ""}`} 
                        
                        style={{transform: `translateX(-${currentIndex * 65}px)`}}>
                              {page}
                          </button>
                      </div>
                  )
              })}
          </div>
        </div>
        
        <div className="image" onClick={onNext} >
        <img src="/Next.png" alt="" />
        </div>
      </div>
    </div>
   
  )
}

export default ReadProducts