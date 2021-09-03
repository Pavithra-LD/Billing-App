import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import swal from 'sweetalert'
import EditCustomer from './EditCustomer'
import { startDeleteCust } from '../Action/billingAction'
import {Link} from 'react-router-dom'

const CustomerItem=(props)=>{
    const [toggle,setToggle]=useState(false)
    const dispatch=useDispatch()
    const {_id,name,mobile,email,i}=props

    //const {id}=props.match.params

    const handleToggle=()=>{
        setToggle(!toggle)
    }

    const handleEdit=(id)=>{
      
    }

    const handleDelete=(id)=>{
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(startDeleteCust(id))          
        } 
      });
        
        
    }
    return(
        <>

        {toggle ? (
          <>
          <EditCustomer
          _id={_id}
          name={name}
          mobile={mobile}
          email={email}
          toggle={toggle}
          handleToggle={handleToggle}
          
          />
          
          {/* <button onClick={handleToggle} 
          >Cancel</button>
          */}
          </>
        ):(
          <>
                <td>{i+1}</td>
                <td>{name}</td> 
                <td>{mobile}</td>
                <td><button type="button" class="btn btn-primary"  onClick={()=>{
                  handleToggle()
                }}
                >Edit</button></td>
                <td><button type="button" class="btn btn-danger"
                onClick={()=>{
                    handleDelete(_id)
                }}>Delete</button></td> 
             </>
        )
        
        }           
        </>
                  
       
    )
}
export default CustomerItem