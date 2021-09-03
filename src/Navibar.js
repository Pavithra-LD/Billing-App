import React from 'react'
import { Link,Route } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import swal from 'sweetalert'
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Account from './Components/Account'
import { handleAuth } from './Action/billingAction'
import BillingContainer from './Billing-Comp/BillingContainer'
import PrivateRoute from './PrivateRoute'


const NaviBar=(props)=>{

    const isLogged=useSelector((state)=>{
        return state.isLoggedIn
    })
    console.log(isLogged)

    const dispatch=useDispatch()

    return(
        <div>
            
            
            <div class="container" class="p-3 mb-2 bg-dark text-white" >
            <div class="d-flex justify-content-lg-end">
            <div class="row" >
            

            <div class="col"><Link to="/" style={{color:"white"}}>Home</Link> </div>
            {isLogged ?(
                <>
                
                <div class="col" ><Link to="/account" style={{color:"white"}}>Account</Link></div>
                <div class="col" ><Link to="/" style={{color:"white"}}onClick={()=>{
                    swal({
                        title: "Successfully Logged",
                        icon: "success",
                      });
                    localStorage.removeItem('token')
                    dispatch(handleAuth())
                }}>Logout</Link></div>
                
                </>
                
            ):(
                <>                                   
                    <div class="col"><Link to="/register" style={{color:"white"}}>Register</Link> </div>                                     
                    <div class="col"><Link to="/login" style={{color:"white"}}>Login</Link></div>
                    
                                  
                </>
            )
            
            }
            </div>
            </div>
            </div>                           
                              
                <Route path="/" component={Home} exact={true}/>
                <Route path="/register" component={Register}/>  
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/account" component={Account}/> 
                                                              

        </div>
    )
}
export default NaviBar