import { configureStore } from "@reduxjs/toolkit";
import ProductSilce from  './Crudslice';

export default configureStore({
    reducer:{
        Product:ProductSilce
    }
})