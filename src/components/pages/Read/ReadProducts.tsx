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
  const pages = [1,2,3,4,5,6,7,8,9,10];
  
  const getItemsPerPage = () => {
    if (window.innerWidth <= 1270 && window.innerWidth>=1090) return 6;
    if (window.innerWidth <= 1090) return 4; // للموبايل والشاشات الصغيرة
    return 8; // للشاشات الكبيرة
  };
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

 
  
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
        ) : (
            currentProducts?.map((item) => {
          return (
            <div className="product-card" key={item.id}>
              <div className='card-container' >
        <DeletePop
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          onDeleted={handleDeleted}
        />
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
        <div className="image">
           <img src="/Prev.png" alt="" onClick={onBack}/> 
        </div>
       
        
        <div className="pagination-wrapper">
          <div className="pagination-window">
              {pages.map((page, index)=>{
                  return(
                      <div className="filter-btn" key={index}>
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
        
        <div className="image">
        <img src="/Next.png" alt="" onClick={onNext}/>
        </div>
      </div>
    </div>
  )
}

export default ReadProducts