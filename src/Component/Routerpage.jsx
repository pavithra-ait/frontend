import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Product from './Product'
import Register from './Register'
import Update from './Update'
import Header from './Header'
import ItemTable from './ItemTable'

export default function Routerpage() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Header />}>
                    <Route path='/product' element={<Product />}></Route>
                    <Route path='/list' element={<ItemTable />}></Route>
                    <Route path='/edit/:id' element={<Update />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </div>
    )
}
