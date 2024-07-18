import { createAction } from "@reduxjs/toolkit"
import { TypeName } from "../../until"
// action tăng giá trị thêm n đơn vị


export const act_increment_ns = (n: number)=>({
        type: TypeName.INCREMENT_N,
        payload: n
})

export const act_increment_n = createAction<number|undefined>("INCREMENT_N");

export const act_decrement_n = (n: number)=>({
        type:"DECREMENT_N",
        payload: n
})

export const act_power_up_n = (n: number)=>({
    type: "POWER_UP_N",
    payload: n
})




