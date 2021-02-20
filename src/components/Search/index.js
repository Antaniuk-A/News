import React, { useState } from 'react';
import { MdSearch } from "react-icons/md";
import styles from './styles.module.css';

export default function Search({ onSearch }) {
	const [inputVal, setInputVal] = useState();

	const handleSubmit = (event) => {
		onSearch(inputVal);

		event.preventDefault();
	}

	const handleChange = (event) => {
		setInputVal(event.target.value);
	}

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit}>
			<input type='text' placeholder='Search' className={styles.searchInput} onChange={handleChange} />
			<span className={styles.searchIconWrapper}>
				<MdSearch size={24} />
			</span>
			
		</form>
	)
}