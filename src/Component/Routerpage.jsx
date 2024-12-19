import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Product from './Product'
import Register from './Register'
import Header from './Header'
import ItemTable from './ItemTable'
import Search from './Search'

export default function Routerpage() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/list'/>}></Route>
                <Route path='/' element={<Header />}>
                    <Route path='/product' element={<Product />}></Route>
                    <Route path='/list' element={<ItemTable />}></Route>
                    <Route path='/search' element={<Search/>}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </div>
    )
}
