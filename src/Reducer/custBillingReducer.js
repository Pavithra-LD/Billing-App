const initialStateValue=[]

const custBillingReducer=(state=initialStateValue,action)=>{
    switch(action.type){
        case "ADD_ITEM":{
            return [...state,{...action.payload}]
        }
        case "DEC_COUNT":{
            return (
                state.map((item)=>{
                    if(item.product===action.payload){
                        return {...item,quantity:item.quantity-1}
                    }else{
                        return {...item}
                    }
                })
            )
        }

        case "ADD_COUNT":{
            return (
                state.map((item)=>{
                    if(item.product===action.payload){
                        return {...item,quantity:item.quantity+1}
                    }else{
                        return {...item}
                    }
                })
            )
        }

        case "REMOVE":{
            return (
                state.filter((item)=>{
                    return item.id!=action.payload
                })
            )
        }

        case "RESET":{
            return initialStateValue
        }
        default:{
            return [...state]
        }
    }
}

export default custBillingReducer