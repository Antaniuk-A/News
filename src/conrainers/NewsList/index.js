import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import Card from '../../components/Card';
import LoadButton from '../../components/LoadButton';
import Error from '../../components/Error';


export default function NewsList({ onLoadMore }) {
	const { articles, isFetching, isEnd, isError } = useSelector(state => state.news, shallowEqual);
	let content;

	const handleLoadMoreClick = () => {
		onLoadMore();
	}

	if (isError) {
		return <Error />
	}

	if (articles.length === 0 && isFetching === false) {
		content = <div>No results</div>;
	} else {
		content = (
			<div className={styles.newsList}>
				{articles.map(article =>
					<Card {...article} key={article.id} />
				)}
			</div>
		);
	}

	return (
		<main className={styles.wrapper}>

			{content}

			<LoadButton
				isFetching={isFetching}
				onLoadMore={handleLoadMoreClick}
				isEnd={isEnd}
			>
				Load more
			</LoadButton>
		</main>
	)
}