import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';
import './NewsList.css';

const NewsList = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="news-container">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="news-container">Error: {error}</div>;
  }

  const refresh = ()=>{
    sessionStorage.removeItem('newsState');
    dispatch(fetchNews());
  }

  return (
    <div className="news-container">
      <h2>Top Headlines</h2>
      <ul className="news-list">
        {articles.map((article, index) => (
            <li key={index} className="news-item">
            <h3>{article.title}</h3>
            <p className="source">{article.source.name}</p>
            <p className="published-date">{new Date(article.publishedAt).toLocaleDateString()}</p>
            <p className="author">Author: {article.author}</p>
            <p className="description">{article.description}</p>
            <p className="url">URL: <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
          </li>
        ))}
      </ul>
        <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default NewsList;
