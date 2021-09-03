const initialStateValue=false 

const loginReducer=(state=initialStateValue, action)=>{
    switch(action.type){
        case "IS_LOGGED_IN":{
            return !state
                
            
        }
        default:{
            return state
        }
    }
}
export default loginReducer