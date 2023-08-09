import React from 'react'
import Nav from './Nav'
import Addproduct from './Addproduct'
import ProductList from './ProductList'
import UpdateProduct from './UpdateProduct'
import UserList from './UserList'
import { Route, Routes } from 'react-router-dom'
import { URL as apiurl } from '../constants/data'

export const URL = apiurl

const DashBoardApp = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="add" element={<Addproduct />} />
                <Route path="users" element={<UserList />} />
                <Route path="update/:id" element={<UpdateProduct />} />
            </Routes>
        </>
    )
}

export default DashBoardApp
