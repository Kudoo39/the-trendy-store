import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'

import { CreateProductType, ProductType, UpdateProductType } from '../../misc/type'

const url = 'https://api.escuelajs.co/api/v1/products'
const categoryUrl = 'https://api.escuelajs.co/api/v1/categories'

type InitialState = {
  allProducts: ProductType[]
  products: ProductType[]
  product: ProductType | null
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  allProducts: [],
  products: [],
  product: null,
  loading: false
}

export const fetchProductsAsync = createAsyncThunk('fetchProductsAsync', async () => {
  try {
    const response = await axios.get<ProductType[]>(url)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const fetchSingleProductAsync = createAsyncThunk('fetchSingleProductAsync', async (id: number) => {
  try {
    const response = await axios.get<ProductType>(`${url}/${id}`)
    return response.data
  } catch (e) {
    const error = e as Error
    return error
  }
})

export const fetchProductsPageAsync = createAsyncThunk(
  'fetchProductsPageAsync',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    try {
      const response = await axios.get<ProductType[]>(`${url}?offset=${offset}&limit=${limit}`)
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const fetchProductsCategoryAsync = createAsyncThunk('fetchProductsCategoryAsync', async (categoryId: number) => {
  try {
    const response = await axios.get<ProductType[]>(`${categoryUrl}/${categoryId}/products`)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const fetchProductsCategoryPageAsync = createAsyncThunk(
  'fetchProductsCategoryPageAsync',
  async ({ categoryId, offset, limit }: { categoryId: number; offset: number; limit: number }) => {
    try {
      const response = await axios.get<ProductType[]>(
        `${categoryUrl}/${categoryId}/products?offset=${offset}&limit=${limit}`
      )
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const createProductsAsync = createAsyncThunk('createProductsAsync', async (newProduct: CreateProductType) => {
  try {
    const response = await axios.post(url, newProduct)
    toast.success('Product added successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Product added failed :(', { position: 'bottom-left' })
    return error
  }
})

export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async ({ updateProduct, productId }: { updateProduct: UpdateProductType; productId: number }) => {
    try {
      const response = await axios.put(`${url}/${productId}`, updateProduct)
      toast.success('Product updated successfully!', { position: 'bottom-left' })
      return response.data
    } catch (e) {
      const error = e as AxiosError
      toast.error('Product updated failed :(', { position: 'bottom-left' })
      return error
    }
  }
)

export const deleteProductAsync = createAsyncThunk('deleteProductAsync', async (productId: number) => {
  try {
    const response = await axios.delete(`${url}/${productId}`)
    toast.success('Product removed successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Product removed failed :(', { position: 'bottom-left' })
    return error
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchProductsAsync
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          allProducts: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // fetchSingleProductAsync
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchSingleProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    //fetchProductsPageAsync
    builder.addCase(fetchProductsPageAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsPageAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsPageAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // fetchProductsCategoryAsync
    builder.addCase(fetchProductsCategoryAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          allProducts: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsCategoryAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsCategoryAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    //fetchProductsCategoryPageAsync
    builder.addCase(fetchProductsCategoryPageAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsCategoryPageAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsCategoryPageAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // createProductsAsync
    builder.addCase(createProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false
      }
    })
    builder.addCase(createProductsAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(createProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // updateProductAsync
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const findingProduct = state.products.findIndex(item => item.id === action.payload.id)
      if (findingProduct !== -1) {
        return {
          ...state,
          products: state.products.map((product, index) => (index === findingProduct ? action.payload : product)),
          loading: false
        }
      }
      return state
    })
    builder.addCase(updateProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // deleteProductAsync
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.id),
        loading: false
      }
    })
    builder.addCase(deleteProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
  }
})

export default productSlice.reducer
