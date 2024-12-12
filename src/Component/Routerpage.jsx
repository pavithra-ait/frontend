import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Product from './Product'
import Register from './Register'
import Update from './Update'

export default function Routerpage() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/product' element={<Product/>}></Route>
                    <Route path='/edit/:id' element={<Update/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
