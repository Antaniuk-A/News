import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { clearNews, fetchNews, fetchNewsByQuery } from '../feature/newsSlice';
import NewsList from '../conrainers/NewsList';
import Search from '../components/Search';

export default function App() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchNews(page));
  }, []);

  const searchByQ = (q) => {
    setQuery(q);
  }

  useEffect(() => {
    if (!query)
      return;

    dispatch(clearNews());
    setPage(1);
    dispatch(fetchNewsByQuery(query, 1))
  }, [query]);


  const setLoad = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    if (page === 1)
      return;
    query
      ? dispatch(fetchNewsByQuery(query, page))
      : dispatch(fetchNews(page))

  }, [page]);

  return (
    <div>
      <Search onSearch={searchByQ} />
      <NewsList onLoadMore={setLoad} />
    </div>
  )
}