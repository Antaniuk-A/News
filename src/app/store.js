import {configureStore} from '@reduxjs/toolkit';
import newsSlice from '../feature/newsSlice';

const store = configureStore({
  reducer: {
    news: newsSlice
  }
})

export default store;