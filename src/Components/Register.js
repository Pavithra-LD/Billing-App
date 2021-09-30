import React,{useState} from 'react'
import{useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import swal from 'sweetalert'
import image from '../../src/images/images.jpg'


const Register=(props)=>{
    const [servererror, setServerError]=useState('')

    const formik=useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            businessName:'',
            address:''
        },

        validationSchema:yup.object({
            username:yup.string()
            .required('Username is required'),
            email:yup.string()
            .email('Invalid Email address').required('Email is required'),
            password:yup.string()
            .required('Password is required'),
            businessName:yup.string()
            .required("Businessname is required"),
            address:yup.string()
            .required("Address is required")

        }),

        onSubmit:values=>{
            const registerValues=values
            axios.post('http://dct-billing-app.herokuapp.com/api/users/register',registerValues)
            .then((response)=>{
                const result=response.data
                //console.log(result)
                // if(result.hasOwnProperty('errors')){
                //     swal(result.errors)
                if(result.hasOwnProperty("driver")){
                    setServerError('Username/Email already exist')
                }               
                else{
                    swal({
                        title: "Successfully Created Account",
                        icon: "success",
                      });
                    props.history.push('/login')
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
            <div 
                 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

            <div class="card" style={{width: "20rem"}} >
            <div class="card-header" class="card text-white bg-secondary mb-3"><h3>Register here!</h3></div>
            
            <form onSubmit={formik.handleSubmit} style={{marginLeft:"15px"}}>
                {servererror && <p style={{color:"red"}}>{servererror}</p>}
                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Username</label><br/>
                <input
                type="text"
                name="username"
                className="form-control"
                style={{width:"16rem"}}
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Enter Username*"
                />{formik.touched.username ? <div style={{color:"red",fontSize:"14px"}}>{formik.errors.username}</div>:null}

                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Email</label><br/>
                <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter Email*"
                className="form-control"
                style={{width:"16rem"}}
                />{formik.touched.email ? <div style={{color:"red",fontSize:"14px"}}>{formik.errors.email}</div>:null}

                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Password</label><br/>
                <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter password*"
                className="form-control"
                style={{width:"16rem"}}
                />{formik.touched.password ?<div style={{color:"red",fontSize:"14px"}}>{formik.errors.password}</div>:null}

                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Business Name</label><br/>
                <input
                type="text"
                name="businessName"
                value={formik.values.businessName}
                onChange={formik.handleChange}
                className="form-control"
                style={{width:"16rem"}}
                placeholder="Enter Business Name"
                />

                <label style={{fontStyle:"italic",fontWeight:"bold"}}>Address</label><br/>
                <input style={{marginBottom:'20px'}}
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="form-control"
                style={{width:"16rem"}}
                placeholder="Address"
                /><br/>

                <button style={{marginBottom:'20px'}}type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
        </div>
        </div>
    )
}
export default Register