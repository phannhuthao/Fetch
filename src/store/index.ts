import {  configureStore } from "@reduxjs/toolkit";
import { root } from "./reducers";


export const store = configureStore({
    reducer: root   //cấu hình store
})