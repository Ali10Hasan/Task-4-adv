import type { AsideInfoProps, input } from "../interface/interface";

export const AsideInfo:Array<AsideInfoProps>=[
    {
        icone:"/Aside1.png",
        item:"Products",
        path:"/dashboard"
    },
    {
        icone:"/Aside2.png",
        item:"Favorites",
        path:"/favorites"
    },
    {
        icone:"/Aside2.png",
        item:"order list",
        path:"/orderlist"
    },
    {
        icone:"/Aisde3.png",
        item:"logout",
        path:"/"
    },
   
]

export const logininputs:Array<input>=[
    {
     type:"email",
     placeholder:"Enter your email",
     label:"Email",
     name:"email",
     colSpan:2
    },
    {
     type:"password",
     placeholder:"Enter your password",
     label:"Password",
     name:"password",
     colSpan:2
    },

  ]

  export const registerinputs:Array<input>=[
    {
     type:"text",
     placeholder:"First Name",
     label:"Name",
     name:"first_name",
     colSpan:1
    },
    {
     type:"text",
     placeholder:"Last Name",
     label:"",
     name:"last_name",
     colSpan:1
    },
    {
     type:"email",
     placeholder:"Enter your email",
     label:"Email",
     name:"email",
     colSpan:2
    },
    {
     type:"password",
     placeholder:"Enter Password",
     label:"Password",
     name:"password",
     colSpan:1
    },
    {
     type:"password",
     placeholder:"Re-enter your password",
     label:"",
     name:"password_confirmation",
    colSpan:1
    },
    {
     type:"file",
     label:"Profile Image",
     name:"profile_image_url",
    colSpan:2
    },

  ]

  