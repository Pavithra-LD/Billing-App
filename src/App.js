import React from 'react'
import Navibar from './Navibar'
import {useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { handleAuth } from './Action/billingAction'


const App=(props)=>{
  const dispatch=useDispatch()

  const customer=useSelector((state)=>{
    return state.customers
  })
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(handleAuth())
      
    }
    
      
  
  },[])
  
  return(
    <div>     
      <Navibar/>
    </div>
  )
}
export default App