import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter } from "react-router";
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import Root from './Root.tsx';
import SignIn from './components/Auth/SignIn.tsx';
import SignUp from './components/Auth/SignUp.tsx';
import DashBoard from './components/pages/Dashboard/DashBoard.tsx';
import ShowElemnt from './components/pages/Read/ShowElemnt.tsx';
import AddedProduct from './components/pages/Create/AddedProduct.tsx';
import EditProduct from './components/pages/Update/EditProduct.tsx';
;

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<Root/>,
      children:[
        {
        path:"",
        element:<SignIn/>
        },
        {
        path:"signup",
        element:<SignUp/>
        },
        {
        path:"dashboard",
        element:<DashBoard/>,
      
      },
      {
      path:"showelement/:id",
      element:<ShowElemnt/>
    },
    {
      path:"addedproduct",
      element:<AddedProduct/>
    },
    {
      path:"editproduct/:id",
      element:<EditProduct/>
    },
      
      ]
    }
    
  ],{
    basename: "/Dashboard-template"
  }
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
