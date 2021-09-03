import axios from '../config/axiosConfig'

export const addBillingItem=((proItems)=>{
    return{
        type:"ADD_ITEM",
        payload:proItems
    }
})

export const decItemCount=(id)=>{
    return{
        type:"DEC_COUNT",
        payload:id
    }
    
}

export const addItemCount=(id)=>{
    return{
        type:"ADD_COUNT",
        payload:id
    }
    
}

export const removeItem=(id)=>{
    return{
        type:"REMOVE",
        payload:id
    }
}

export const resetCartItem=()=>{
    return{
        type:"RESET"

    }
}
