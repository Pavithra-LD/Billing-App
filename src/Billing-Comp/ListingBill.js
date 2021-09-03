import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import {startDeleteBill} from '../Action/customerBillingAction'
import ViewBill from './ViewBill'


const ListingBill=(props)=>{
    const{handleToggle}=props

    const dispatch=useDispatch()

    // const[view, setView]=useState(false)
    // const[term,setTerm]=useState('')
    const[viewToggle, setViewToggle]=useState(false)
    const[id,setId]=useState('')
    
    const billings=useSelector((state)=>{
        return state.billings
    })

    const customers=useSelector((state)=>{
        return state.customers
    })

    const handleView=(id)=>{
        setViewToggle(!viewToggle)
        setId(id)
    }

    // const handleSearch=(e)=>{
    //     setTerm(e.target.value)
    // }

    // const filteredBillings=billings.filter((ele)=>{       
            
                            
        
    // })

    

    //console.log(filteredBillings)

    // const handleView=(id)=>{
    //     setView(!view)
    //     setId(id)
    // }

    const handleDelete=(id)=>{
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(startDeleteBill(id)) 
            } 
          });
        
        
    }

    return(
        <div>
            

            {!viewToggle ? (
                <div>
                    <h3>Total Billings -{billings.length}</h3>
            {/* <input type="text" value={term} onChange={handleSearch}></input> */}
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>CreatedAt</th>                              
                    <th>Customer</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {billings.map((bill,i)=>{
                    return customers.map((cust)=>{
                        if(bill.customer===cust._id){
                            return(
                                <tr key={bill._id}>
                                    <td>{i+1}</td>
                                    <td>{bill.date}</td>                                   
                                    <td>{cust.name}</td>
                                    <td><Link to={`/account/bills/all/${bill._id}`}><button type="button" class="btn btn-primary"                               
                                    onClick={()=>{
                                        handleView(bill._id)
                                    }}
                                    >View</button></Link></td>
                                    <td><button type="button" class="btn btn-danger" onClick={()=>{
                                        handleDelete(bill._id)
                                    }}>Delete</button></td>
                                </tr>
                            )
                        }
                    })
                   
                })}
            </tbody>
        </table>
                </div>
            ):(
                <div>
                <ViewBill viewToggle={viewToggle} handleView={handleView} id={id} />
                <Link to="/account/bills/all"><button class="btn btn-secondary" onClick={handleView}>Back</button></Link>
            </div>
        )}
            
            

        
        
    </div>)
}

export default ListingBill