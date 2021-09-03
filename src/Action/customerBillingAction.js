import axios from '../config/axiosConfig'

export const startGetBilling=()=>{
    return(dispatch)=>{
        axios.get('/api/bills')
        .then((response)=>{
            const result=response.data
            //console.log(response.data)
            dispatch(getBilling(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const getBilling=((result)=>{
    return {
        type:"GET_BILLS",
        payload:result
    }
})

export const addBilling=(result)=>{
    return{
        type:"ADD_BILL",
        payload:result
    }
}

export const startDeleteBill =(id)=>{
    console.log(id)
    return(dispatch)=>{
        axios.delete(`/api/bills/${id}`)
        .then((response)=>{
            const result=response.data
            //console.log(result)
            dispatch(deleteBill(result._id))
        })
        .catch((err)=>[
            alert(err.message)
        ])
    }
}

export const deleteBill=(id)=>{
    return{
        type:"DELETE_BILL",
        payload:id
    }
}