import React,{useState} from 'react'
import { formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import {useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { handleAuth } from '../Action/billingAction'
import image from '../../src/images/images.jpg'

const Login=(props)=>{   
    const dispatch=useDispatch()
    const[serverError,setServerError]=useState('')

    const formik=useFormik({
        initialValues:{
            email:'',
            password:''
        },

        validationSchema:yup.object({
            email:yup.string()
            .email('Invalid Email address').required('Email is required'),
            password:yup.string()
            .required('Please enter password')
        }),

        onSubmit:values=>{
            const loginValues=values
            //console.log(loginValues)
            axios.post('http://dct-billing-app.herokuapp.com/api/users/login',loginValues)
            .then((response)=>{
                const result=response.data
                //console.log(result)
                if(result.hasOwnProperty('errors')){
                    setServerError(result.errors)
                }else{
                    localStorage.setItem('token',result.token)
                    props.history.push('/account/dashboard')
                    dispatch(handleAuth())
                    swal({
                        title: "Successfully LoggedIn",
                        icon: "success",
                      });
                    window.location.reload()
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
        }   
    })
    return(
        <div style={{
            
                backgroundImage:'url('+image+')',
                backgroundSize: "cover",
                height: "600px",                              
            }}>
            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <div class="card" style={{width: "18rem"}}>

            <div class="card-header" class="card text-white bg-secondary mb-3"><h3 style={{marginLeft:'30px'}}>Login</h3></div>
            <form onSubmit={formik.handleSubmit} style={{marginLeft:"15px"}}>
                {serverError && <p style={{color:"red"}}>{serverError}</p>}
                
                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Email*</label> <br/>
                <input
                type="text"
                name="email"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Enter email"
                className="form-control"
                style={{width:"16rem"}}
                />{formik.touched.email ? <div style={{color:"red",fontSize:"14px",fontStyle:"italic"}}>{formik.errors.email}</div>:null}
                
                

                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Password*</label><br/>
                <input style={{marginBottom:'5px'}}
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                className="form-control" 
                style={{width:"16rem"}}            
                />{formik.touched.password ? <div style={{color:"red",fontSize:"14px",fontStyle:"italic"}}>{formik.errors.password}</div>:null} <br/>

                <button type="submit" style={{marginBottom:'20px'}}type="submit" class="btn btn-primary">Login</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default Login