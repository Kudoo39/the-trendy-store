import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { AppState, useAppDispatch } from '../redux/store'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Background from '../assets/images/background.jpg'
import defaultImage from '../assets/images/default_image.jpg'
import { CenteredBox } from '../styled-components/Box'
import Card from '@mui/material/Card/Card'
import CardMedia from '@mui/material/CardMedia/CardMedia'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import CardContent from '@mui/material/CardContent/CardContent'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import CardActionArea from '@mui/material/CardActionArea/CardActionArea'
import '../components/animation/animation.css'

const Home = () => {
  const dispatch = useAppDispatch()
  const products = useSelector((state: AppState) => state.products.products)

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '530px',
          width: '100%',
          display: 'flex',
          marginBottom: '48px'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: 'text.disabled',
            color: 'background.default',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
              Your Destination for Quality Finds
            </Typography>
            <Box className='animation'>
              <Typography
                variant="h2"
                sx={{ fontSize: '40px', marginBottom: '20px', fontWeight: 'bold' }}
              >
                The Trendy Store
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 400, margin: '0px 20px 30px 20px', textAlign: 'center' }}>
              Welcome to The Trendy Store, where every product tells a story. From handpicked items to the latest trends!
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/products"
              sx={{
                'fontWeight': 600,
                'padding': '12px 30px',
                'borderColor': 'background.default',
                'color': 'background.default',
                '&:hover': { color: '#2196f3' }
              }}
            >
              <span>Explore Our Products</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <CenteredBox sx={{ marginBottom: '24px' }}>
        <Box sx={{ width: '20px', height: '1px', backgroundColor: 'text.secondary' }} />
        <Typography
          variant="h2"
          sx={{ fontSize: '24px', fontWeight: 'bold', margin: '8px', color: 'text.secondary' }}
        >
          Featured Products
        </Typography>
        <Box sx={{ width: '20px', height: '1px', backgroundColor: 'text.secondary' }} />
      </CenteredBox>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
          margin: '20px',
          justifyContent: 'center',
          marginBottom: '36px'
        }}
      >
        {products?.slice(0, 4).map(product => (
          <Card
            key={product._id}
            sx={{
              'border': '1px solid #ddd',
              'borderRadius': '8px',
              'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
              'transition': 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
              'display': 'flex',
              'flexDirection': 'column',
              'justifyContent': 'space-between',
              'marginX': '20px'
            }}
          >
            <CardActionArea component={RouterLink} to="/products">
              <CardMedia
                component="img"
                alt={product.title}
                image={checkImage(cleanImage(product.image)) ? cleanImage(product.image) : defaultImage}
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent sx={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  Price:{' '}
                  <Typography component="span" sx={{ fontWeight: 'normal' }}>
                    €{product.price}
                  </Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Home
