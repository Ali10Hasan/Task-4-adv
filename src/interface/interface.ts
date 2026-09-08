import type { Dispatch, SetStateAction } from "react"

export interface userData {
    first_name?: string,
    last_name?: string,
    user_name?: string,
    email: string,
    password: string,
    password_confirmation?: string,
    profile_image_url?: Blob
}

export interface productData {
    name: string,
    price: string,
    image?: Blob
}

export interface input {
    type: string,
    placeholder?: string,
    label: string,
    name: string,
    value?: string | number | Blob
    colSpan?: number,
}

// تم جعل الـ Interface بالكامل يعتمد على <T> ليتوافق ديناميكياً
export interface formProps<T> {
    logo?: string,
    title?: string,
    subTitle?: string,
    inputs: Array<input>,
    btnText?: string,
    hint?: string,
    actionText?: string,
    classname: string,
    setData: Dispatch<SetStateAction<T>>, 
    onSubmit?: (data: T) => void | Promise<void>,
    initialData: T
}

export interface AsideInfoProps {
    icone: string,
    item: string,
    path: string
}

export interface AsideProps {
    logo: string,
    image: string,
    name: string,
    AsideInfo: Array<AsideInfoProps>
}

export interface GetProducts {
    id: number,
    name: string,
    price: number,
    image_url: string,
    created_at: string,
    updated_at?: string
}

export type AddProduct = productData
export type ShowAlertType = {
    showAlert: (message: string, type: "success" | "error") => void
};
