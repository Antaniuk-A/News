import React from 'react';
import styles from './styles.module.css';

function Card({
  author,
  title,
  content,
  urlToImage,
  url
}) {
  return (
    <a href={url} alt={title} className={styles.cardWrapper}>
        <div className={styles.cardImg} style={{ backgroundImage: `url(${urlToImage})` }}></div>
        <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardArticle}>
        <p>{content}</p>
        <p className={styles.cardAuthor}>{author}</p>
      </div>
    </a>
  );
}

export default React.memo(Card);