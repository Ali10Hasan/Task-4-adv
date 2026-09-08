import { NavLink, useNavigate } from "react-router-dom"
import type { formProps, productData, userData } from "../../interface/interface"
import { useRef, useState, type FormEvent } from "react"
const Form = ({
  logo,
  title,
  subTitle,
  inputs,
  btnText,
  hint,
  actionText,
  classname,
  setData,
  initialData,
}: formProps) => {
  const data = useRef<userData | productData>(initialData)  
  const [previewImage, setPreviewImage] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password,setPassword]=useState({
    pass:"",
    rePass:""
  })
  const navigate=useNavigate()
  const isEditLayout = classname === "Edit"
  const hasPasswordMismatch = password.rePass.length > 0 && password.pass !== password.rePass
  const resolveImageUrl = (url: string | number | undefined) => {
    if (!url || typeof url !== 'string') return ""
    if (url.startsWith("http://dashboard-i552.onrender.com")) {
        return url.replace("http://", "https://")
    }
    return url
  }
  const sendData = () => {
    setData(data.current)
  }
       
 
  return (
    <div className={`auth-container ${classname}`}>
      <div className="card-header">
        <img src={logo} alt="" />

        <div className="card-title">
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>
      </div>

      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          setIsSubmitting(true);
          sendData();
        }}
      >
        <div className={`card-body ${classname}`}>
          {inputs.map((input, index) => (
            <div
              key={index}
              className={`card-input span-${input.colSpan}`}
            >
              <label htmlFor={input.name}>
                {input.label}
              </label>

              {input.type === "file" ? (
                <>
                  <input
                    hidden
                    id={input.name}
                    type={input.type}
                    name={input.name}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                       data.current = { ...data.current, [input.name]: file } 
                        setPreviewImage(URL.createObjectURL(file))
                      }
                    }}
                  />
                  {isEditLayout ? (
                    <div className="image-upload">
                      <label
                        htmlFor={input.name}
                        className="image-slot"
                      />
                      <label
                        htmlFor={input.name}
                        className="image-slot image-slot--main"
                      >
                        <img
                          className="image-preview"
                          src={
                              previewImage
                                ? previewImage
                                : input.value
                                ? resolveImageUrl(input.value)
                                : "/Upload.png"
                          }
                          alt=""
                        />
                      </label>
                      <label
                        htmlFor={input.name}
                        className="image-slot"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor={input.name}
                      className="profile-image"
                    >
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : "/Upload.png"
                        }
                        style={{
                          width: previewImage ? 100 : 49,
                          height: previewImage ? 100 : 45,
                        }}
                        alt=""
                      />
                    </label>
                  )}
                </>
              ) : 
              (
                
                <input
                className={input.name === "password_confirmation" && hasPasswordMismatch ? "input-error" : ""}
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  onChange={(e) =>{
                    data.current = { ...data.current, [input.name]: e.target.value } 
                    classname==="signup-form" && input.name === "password" && setPassword({...password,pass:e.target.value})
                    classname==="signup-form" && input.name === "password_confirmation" && setPassword({...password,rePass:e.target.value})
                  }}
                  defaultValue={input.value}
                />
              )}
              
              {input.name === "password_confirmation" && hasPasswordMismatch && (
                <p className="error" >Passwords do not match</p>
              )}
              </div>
          ))}

          <button type="submit" className={`submit-btn ${classname}`} disabled={isSubmitting}  onClick={()=>{
            if(classname === "Added" || classname === "Edit"){
                navigate("/dashboard")
            }
          }}>
            {isSubmitting ? "Loading..." : btnText}
          </button>

          <p>
            {hint}

            <NavLink
              to={
                actionText === "Create One"
                  ? "/signup"
                  : "/"
              }
            >
              <span>{actionText}</span>
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;