import {TODO} from "../constants/addToCart"

export const uploadProduct = () => {
    return {
        type: TODO.UPLOAD_PRODUCT
    }
}

export const addToCart = (product: any) => {
    return {
        type: TODO.ADD_TO_CART,
        payload: {...product}
    }
}

export const deleteProductFromCart = (id: number) => {
    return {
        type: TODO.DELETE_PRODUCT,
        payload: id
    }
}