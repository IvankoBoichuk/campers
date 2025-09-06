import { configureStore } from '@reduxjs/toolkit'
import { campersReducer } from './campers/campersSlice'
import { filtersReducer } from './filter/filterSlice'
import { wishlistReducer } from './wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
  },
})