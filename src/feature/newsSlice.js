import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import normalizeResponse from '../util/normalizeResponse';

const fetchNewsThunk = createAsyncThunk('news/fetchNewsThunk', ({ page, query, header }) => {
  return fetch(`${process.env.REACT_APP_API_URL}${header}&pageSize=${process.env.REACT_APP_PAGE_SIZE
    }&page=${page}${query ? `&q=${query}` : ''}&apiKey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(res => ({ ...normalizeResponse(res) }));
})

export const fetchNews = (page = 1) => {
  const header = 'top-headlines?country=us';
  return fetchNewsThunk({ header: header, page: page });
}

export const fetchNewsByQuery = (query, page = 1) => {
  const header = 'everything?language=en&sortBy=relevancy';
  return fetchNewsThunk({ header: header, page: page, query: query });
}

export const news = createSlice({
  name: "news",
  initialState: {
    isError: false,
    isFetching: false,
    page: 1,
    query: undefined,
    isEnd: false,
    articles: []
  },
  reducers: {
    clearNews: state => { state.articles = [] }
  },
  extraReducers: {
    [fetchNewsThunk.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchNewsThunk.fulfilled]: (state, action) => {
      state.articles = [...state.articles, ...action.payload.articles];
      state.isFetching = false;
      state.isEnd = action.payload.isEnd;
      state.isError = false;
    },
    [fetchNewsThunk.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    }
  }
});

export const { clearNews } = news.actions;

export const selectArticles = (state) => state.news.articles;
export const selectPage = (state) => state.news.page;
export const selectQ = (state) => state.news.query;

export default news.reducer;