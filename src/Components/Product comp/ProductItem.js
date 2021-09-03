import React,{useState} from 'react'
import EditProduct from './EditProduct'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { startDeleteProduct } from '../../Action/productAction'

const ProductItem=(props)=>{
    const{_id,name,price,i}=props
    //const {}=props.match.params
    const[toggle,setToggle]=useState(false)
    const dispatch=useDispatch()

    const handleToggle=()=>{
        setToggle(!toggle)
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
                dispatch(startDeleteProduct(id))         
            } 
          });
        
    }

    return(
        <>
            
            {toggle ? (
                
                <>
                <EditProduct
                _id={_id}
                name={name}
                price={price}
                handleToggle={handleToggle}
                toggle={toggle}
                />
                {/* <button onClick={handleToggle}>Cancel</button> */}
                </>
            ):(
                <>
                <td>{i+1}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td ><button type="button" class="btn btn-primary"
                    onClick={handleToggle}>Edit</button></td>
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
export default ProductItem