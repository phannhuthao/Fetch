import { combineReducers } from "redux";

export const reducer = (state: number = 0, action : {type: string,payload:number})=>{ // có 1 hàm của toolkit giúp tạo reducer nhanh : createReducer  , createSlice 
    switch (action.type){
        case "INCREMENT_N":
            // tăng giá trị state len n đơn vị
            state += action.payload;
            return state;
        case "DECREMENT_N":
            state -= action.payload;
            return state;
        case "POWER_UP_N":
            state = Math.pow(state,action.payload);
            return state;
        default:
            return state;
    }

}

// tạo root reducers
export const root = combineReducers({count: reducer})