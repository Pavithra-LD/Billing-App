import axios from 'axios'
import { result } from 'lodash'
import React from 'react'
import { useState,useEffect } from 'react'
import { Link,Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Dashboard from './Dashboard'
import Customers from './Customers'
import ProducContainer from './Product comp/ProducContainer'
import { startGetCoustomer } from '../Action/billingAction'
import { startGetProduct } from '../Action/productAction'
import BillingContainer from '../Billing-Comp/BillingContainer'
import { startGetBilling } from '../Action/customerBillingAction'
import ListingBill from '../Billing-Comp/ListingBill'
import ViewBill from '../Billing-Comp/ViewBill'
import PrivateRoute from '../PrivateRoute'


const Account=(props)=>{
    const [account,setAccount]=useState([])
    const token =localStorage.getItem('token')
    const dispatch=useDispatch()
    
        useEffect(()=>{      
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response)=>{
           const result=response.data
           setAccount(result)
        })
        .catch((err)=>{
            alert(err.message)
        })

        dispatch(startGetCoustomer())
        dispatch(startGetProduct())
        dispatch(startGetBilling())

    },[])
    


    return(
        <div>
            <h3>Welcome {account.username} !!</h3>
            <div class="mb-5">
            <div class="d-flex justify-content-around" style={{backgroundColor:"black"}}>
                
                
                <Link to ="/account/dashboard">Dashboard</Link>
                <Link to="/account/customers">Customers</Link>
                <Link to="/account/products">Products</Link>
                <Link to="/account/bills">Billings</Link>
                                
            </div>
            </div>

            <PrivateRoute path="/account/dashboard" component={Dashboard} exact={true}/>
            <PrivateRoute path="/account/customers" component={Customers} exact={true}/>
            <PrivateRoute path="/account/products" component={ProducContainer} exact={true}/>
            <PrivateRoute path="/account/bills" component={BillingContainer} exact={true}/>
            <PrivateRoute path="/account/bills/all" component={ListingBill}/>
            <PrivateRoute path="/account/bills/all/:id" component={ViewBill}/>

        </div>
        
    )
}
export default Account