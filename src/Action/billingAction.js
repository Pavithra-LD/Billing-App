import axios from '../../src/config/axiosConfig'
import swal from 'sweetalert'
import EditCustomer from '../Components/EditCustomer'
import ProductForm from '../Components/Product comp/ProductForm'
import productReducer from '../Reducer/productReducer'

export const handleAuth=()=>{
    return{
        type:"IS_LOGGED_IN"
    }
    
}

export const startGetCoustomer=()=>{
    const token=localStorage.getItem('token')
    return(dispatch)=>{
        axios.get('/api/customers')
        .then((response)=>{
            const result=response.data 
            console.log(result)           
            dispatch(customers(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const customers=(result)=>{
    return{
        type:"CUSTOMER",
        payload:result
    }
}

export const startAddCustomer=(customerData)=>{

    return(dispatch)=>{
        axios.post('/api/customers',customerData)
        .then((response)=>{
            const customer=response.data
            console.log('customer',customer)
            swal({
                title: "Customer Added",
                icon: "success",
              });
            dispatch(addCustomer(customer))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const addCustomer=(customer)=>{
    return{
        type:"ADD_CUSTOMER",
        payload:customer
    }
}

export const startUpdateCustomer=(customerData)=>{
    //console.log(customerData)
    return(dispatch)=>{
        axios.put(`/api/customers/${customerData._id}`,customerData)
        .then((response)=>{
            const customerData=response.data
            //console.log(response.data)
            dispatch(editCustomer(customerData))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const editCustomer=(customer)=>{
    return{
        type:"EDIT_CUSTOMER",
        payload:customer
    }
}

export const startDeleteCust=(id)=>{
    return(dispatch)=>{
        axios.delete(`/api/customers/${id}`)
        .then((response)=>{
            const result=response.data
            dispatch(deleteCust(result._id))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const deleteCust=(id)=>{
    return{
        type:"DELETE_CUST",
        payload:id
    }
    
}

