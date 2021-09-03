import React from 'react'
import CustomerForm from './CustomerForm'
import {useDispatch, UseDispatch} from 'react-redux'
import { startAddCustomer } from '../Action/billingAction'

const AddCustomer=(props)=>{
    const dispatch=useDispatch()


    const formsubmission=(customerData)=>{
        //console.log(customerdata)
        dispatch(startAddCustomer(customerData))
    }

    return(
        <div>
            <CustomerForm 
            formsubmission={formsubmission}
            />           
        </div>
    )
}
export default AddCustomer