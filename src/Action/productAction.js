import axios from '../../src/config/axiosConfig'
import swal from 'sweetalert'

export const startGetProduct=()=>{
    return(dispatch)=>{
        axios.get(`/api/products`)
        .then((response)=>{
            const result=response.data
            dispatch(products(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const products=(result)=>{
    return{
        type:"PRODUCTS",
        payload:result
    }
}

export const startAddproduct=(productData)=>{
    return(dispatch)=>{
        axios.post('/api/products',productData)
        .then((response)=>{
            console.log(response.data)
            const product=response.data 
            dispatch(addproducts(product))
            swal({
                title: "Product Added",
                icon: "success",
              });
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const addproducts=(product)=>{
    return{
        type:"ADD_PRODUCTS",
        payload:product
    }
}

export const startUpdateProduct=(productData)=>{
    //console.log()
    return(dispatch)=>{
        axios.put(`/api/products/${productData._id}`,productData)
        .then((response)=>{
            const result=response.data
            dispatch(updateProd(productData))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const updateProd=(productData)=>{
    return{
        type:"UPDATE_PRODUCT",
        payload:productData
    }
}

export const startDeleteProduct=(id)=>{
    return(dispatch)=>{
        axios.delete(`/api/products/${id}`)
        .then((response)=>{
            const result=response.data
            //console.log(result)
            dispatch(deleteProd(result._id))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const deleteProd=(id)=>{
    return{
        type:"DELETE_PRODUCT",
        payload:id
    }
}