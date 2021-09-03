import {createStore,combineReducers,applyMiddleware} from 'redux'
import loginReducer from '../Reducer/loginReducer'
import thunk from 'redux-thunk'
import customerReducer from '../Reducer/customerReducer'
import productReducer from '../Reducer/productReducer'
import billingReducer from '../Reducer/billingReducer'
import custBillingReducer from '../Reducer/custBillingReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
        isLoggedIn:loginReducer,
        customers:customerReducer,
        products:productReducer,
        billings:billingReducer,
        custBilling:custBillingReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore