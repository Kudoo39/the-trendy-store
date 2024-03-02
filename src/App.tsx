import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { memo } from 'react'

import Nav from './components/Nav'
import Home from './pages/Home'
import Product from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Box from '@mui/material/Box'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { AppState } from './redux/store'
import './App.css'

const App = () => {
  const isAuthenticated = useSelector((state: AppState) => state.users.isAuthenticated)

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Box style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default memo(App)
