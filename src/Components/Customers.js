import React,{useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import CustomerForm from './CustomerForm'
import CustomerItem from './CustomerItem'
import AddCustomer from './AddCustomer'


const Customers=()=>{
    const [term,setTerm]=useState('')
    const[addCus, setAddCus]=useState(false)
    const customers=useSelector((state)=>{
        return state.customers
    })

    const handleChange=(e)=>{
        setTerm(e.target.value)
    }

    const handleAddCus=()=>{
        setAddCus(true)
    }

    const customerList=customers.filter((ele)=>{
        return ele.name.toLowerCase().includes(term) || ele.mobile.toLowerCase().includes(term)
    })
    
    return(
        <div class="container">
            <div class="row">
                
                <AddCustomer/>
            </div>
            {customers.length===0 ? (
                <>
                <h2>No customer found</h2>
                </>
            ):(      
                <>
                 <div class="mb-2">
                     <div class="row" >
                         <div class="col-md-12">
                        <input className="form-control"
                                style={{width:"20rem",marginBottom:'10px',marginLeft:"40rem"}}type="text" value={term} placeholder="Search by Name or Phone" onChange={handleChange}/>                       
                        </div>
                     </div>
                 </div>
                 
                 <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div class="card" style={{width: "50rem"}}>
                        <table class="table table-striped" >
                            <thead class="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {customerList.map((customer,i)=>{
                                    return(
                                        <tr key={customer._id}>
                                            <CustomerItem
                                        key={customer._id}
                                        {...customer}
                                        i={i}
                                        />
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                            </table>
                        </div>
                        
                        
                   
                    
                 </div>   
                </>

                                               
            )
            }
            
            
        </div>
        
    )
}

export default Customers