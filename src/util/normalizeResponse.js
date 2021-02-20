import { v5 as uuidv5 } from 'uuid';

export default function normalizeResponse(data) {
  const articles = data.articles.map(article => ({
    id: uuidv5(article.url, uuidv5.URL),
    title: article.title,
    author: article.author || article.source.name,
    content: article.description,
    url: article.url,
    urlToImage: article.urlToImage
  }));

  const isEnd = data.articles.length === 0 || data.articles.length < parseInt(process.env.REACT_APP_PAGE_SIZE)

  return {
    isEnd: isEnd,
    articles: articles
  }
}