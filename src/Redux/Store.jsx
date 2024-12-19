import { configureStore } from "@reduxjs/toolkit";
import Productreducer from  './Crudslice';

export default configureStore({
    reducer:{
        Product:Productreducer
    }
})