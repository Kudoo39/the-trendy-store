import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import { useColorScheme } from '@mui/material/styles'
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg'
import { logout } from '../redux/slices/userSlice'
import { AppState } from '../redux/store'

const Nav = () => {
  const cartItems = useSelector((state: AppState) => state.cart.cart)
  const authenticate = useSelector((state: AppState) => state.users.isAuthenticated)
  const dispatch = useDispatch()

  const totalItems = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    setAnchorEl(null)
  }

  const ModeToggle = () => {
    const { mode, setMode } = useColorScheme()
    return (
      <IconButton
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
        sx={{ marginRight: { xxs: '0', xsm: '6px', xs: '12px' }, color: 'black' }}
      >
        {mode === 'light' ? <LightModeIcon sx={{ fontSize: '30px' }} /> : <DarkModeIcon sx={{ fontSize: '30px' }} />}
      </IconButton>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          flexWrap: 'wrap'
        }}
      >
        <SvgIcon component={ShopIcon} inheritViewBox sx={{ cursor: 'pointer', fontSize: '32px', margin: '0 10px' }} />
        <Link component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'black',
              '&:hover': { color: 'navy', fontWeight: 650 }
            }}
          >
            Home
          </Box>
        </Link>
        <Link component={RouterLink} to="/products" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'black',
              '&:hover': { color: 'navy', fontWeight: 650 }
            }}
          >
            Products
          </Box>
        </Link>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggle />
        <Tooltip title="Carts">
          <Badge badgeContent={totalItems} color="primary">
            <Link component={RouterLink} to="/cart" sx={{ display: 'flex', verticalAlign: 'middle', color: 'inherit' }}>
              <ShoppingCartIcon sx={{ fontSize: '30px', cursor: 'pointer', color: 'black' }} />
            </Link>
          </Badge>
        </Tooltip>
        <Tooltip title="Profiles">
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              minWidth: 'unset',
              padding: 0,
              color: 'inherit',
              margin: { xxs: '0 4px', xsm: '0 10px', xs: '0 17px' }
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: '30px', color: 'black' }} />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <Link component={RouterLink} to="/profile" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>

          {authenticate ? (
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          ) : (
            <Link component={RouterLink} to="/login" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={handleClose}>Log In / Register</MenuItem>
            </Link>
          )}
        </Menu>
      </Box>
    </Box>
  )
}

export default Nav
